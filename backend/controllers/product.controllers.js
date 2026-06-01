const { Product, Category } = require("@models");
const { uploadImage, deleteImage, envPath } = require("@services/upload");

exports.addProduct = async (req, res) => {
  // console.log("req.body ", req.body);
  // console.log("req.files ", req.files);
  try {
    const product = await Product.create({
      ...req.body,
      materials: JSON.parse(req.body.materials),
      categories: JSON.parse(req.body.categories)
    });
    if (req.files) {
      const bucketPath = envPath("/images/products");
      if (Array.isArray(req.files.images)) {
        const files = req.files.images;
        for (const [index, file] of files.entries()) {
          const { secure_url, public_id } = await uploadImage(
            file.path,
            bucketPath
          );
          product.images.push({
            index: index,
            path: public_id,
            url: secure_url,
          });
        }
      } else {
        const { secure_url, public_id } = await uploadImage(
          req.files.images.path,
          bucketPath
        );
        product.images.push({
          index: 0,
          path: public_id,
          url: secure_url,
        });
      }
      await product.save();
    }
    return res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { imgRemovedList,...updatedData} = req.body
  try {
    if(imgRemovedList){
      for(const img of JSON.parse(imgRemovedList)){
        await deleteImage(img.path);
        const product = await Product.findOneAndUpdate({ _id: productId },{
          $pull: {
            images: {_id: img.id},
          }
        },{ new: true }).exec();

        if (product) {
          const firstIndex = product.images.length > 0 ? product.images[0].index : 0;
          for (let i = 0; i < product.images.length; i++) {
            const newIndex = firstIndex + i;
            product.images[i].index = newIndex;
          }
          await product.save();
        }
      }
    }
    
    if (req.files && req.files.images) {
      const bucketPath = envPath("/images/products");
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      for (const file of files) {
        const { secure_url, public_id } = await uploadImage(file.path, bucketPath);
        const product = await Product.findOne({ _id: productId }).exec();
        const lastIndex = product.images.length > 0 ? product.images[product.images.length - 1].index : -1;
        const newIndex = lastIndex + 1;
        await Product.findOneAndUpdate(
          { _id: productId },
          { $push: { images: { index: newIndex, path: public_id, url: secure_url } } },
          { new: true }
        ).exec();
      }
    }
    const product = await Product.findOneAndUpdate({ _id: productId },{
      ...updatedData,
      materials: JSON.parse(updatedData.materials),
      categories: JSON.parse(updatedData.categories)
    },{ new: true }).exec();

    return res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};
exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId).exec();
    if (!product) return res.status(404).send();
    if(product.images){
      for(const img of product.images){
        if(img.path){
          await deleteImage(img.path);
        }
      }
    }
    await Product.findByIdAndDelete(productId).exec();
    return res.status(200).send({ productId: product._id, message: "Produit supprimé"});
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.deleteManyProducts = async (req, res) => {
  const {productListDeleted} = req.body;
  try {
    let idsList;
    let imagesPathList;
    if(Array.isArray(productListDeleted) && productListDeleted.length){
      idsList = productListDeleted.map(p => p.id)
      imagesPathList = productListDeleted.flatMap(p => p.images?.map(item => item.path));
      await Product.deleteMany({_id:{$in:idsList}}).exec();
      for(const imgPath  of imagesPathList){
        if(imgPath){
          await deleteImage(imgPath );
        }
      }
    }
    return res.status(200).send(idsList);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const result = await Product.findById(productId).exec();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getProducts = async (req, res) => {
  const {searchKey, categories, materials, minPrice, maxPrice,} = req.query;
  const query = {};
 
  if (categories) {
    query.categories = { $all: categories.split(',') };;
  }
  if (materials) {
    query.materials = { $all: materials.split(',') };;
  }
  
  if (minPrice) {
    query.price = { ...query.price, $gte: parseFloat(minPrice) };
  }

  if (maxPrice) {
    query.price = { ...query.price, $lte: parseFloat(maxPrice) };
  }
  
  if (searchKey) {
    query.$text = { $search: searchKey };
    // query.$or = [
    //     { name: { $regex: searchKey, $options: 'i' } },
    //     { description: { $regex: searchKey, $options: 'i' } }
    // ];
  }

  // console.log("query ", query);
  try {
    let result;
    if(searchKey && searchKey.trim() !== ''){
      result = await Product.find(query)
      .sort({score:{$meta:'textScore'}})
      .populate("categories","_id name image description")
      .exec();
    }else{
      result = await Product.find(query).populate("categories","_id name image description").exec();
    }
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

exports.getProductsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const products = await Product.find({ categories: categoryId }).populate("categories","_id name image description").exec();
    if (!products) return res.status(404).send("Category not found");
    return res.status(200).send(products);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
};

// je dois faire une api qui fait ça?

/*un histogramme avec le total par jour des ventes sur les 7 derniers jours,
période modifiable en total par semaine sur les 5 dernières semaines ;*/
exports.getSalesHistogram = async (req, res) => {
  const period = req.query.period || 'day';

  if (period !== 'day' && period !== 'week') {
    return res.status(400).json({ message: 'Invalid period' });
  }

  let startDate, endDate;
  let dateFormat;

  if (period === 'day') {
    startDate = new Date();
    endDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    dateFormat = '%Y-%m-%d';
  } else if (period === 'week') {
    startDate = new Date();
    endDate = new Date();
    startDate.setDate(startDate.getDate() - 35); // Couvrir les 5 dernières semaines
    dateFormat = '%Y-%U';
  }

  try {
    const salesData = await Product.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: period === 'week' ? {
            $dateToString: {
              format: "%Y-%U",
              date: '$createdAt',
              timezone: 'UTC'
            }
          } : {
            $dateToString: {
              format: "%Y-%m-%d",
              date: '$createdAt',
              timezone: 'UTC'
            }
          },
          total: { $sum: '$sales' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Génération des dates attendues
    const expectedDates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (period === 'week') {
        const year = currentDate.getFullYear();
        const startOfYear = new Date(year, 0, 1);
        const weekNumber = Math.ceil(((currentDate - startOfYear) / (7 * 24 * 60 * 60 * 1000)) + 1);
        expectedDates.push(`${year}-${weekNumber.toString().padStart(2, '0')}`);
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (period === 'day') {
        expectedDates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    // Compléter les données de ventes
    const filledSalesData = expectedDates.map(date => {
      const existingData = salesData.find(item => item._id === date);
      return {
        _id: date,
        total: existingData ? existingData.total : 0,
      };
    });

    res.json(filledSalesData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};


/*une histogramme multi-couches avec le total par catégories des paniers moyens
sur les 7 derniers jours, modifiable sur une période des 5 dernières semaines ;*/
exports.getAverageBasketHistogram = async (req, res) => {
  const period = req.query.period || 'day'; // 'day' ou 'week' comme paramètre de la requête
  let startDate, endDate, groupFormat;

  // Définir la période : 7 jours ou 5 semaines
  if (period === 'day') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    groupFormat = '%Y-%m-%d'; // Format pour regrouper par jour
  } else if (period === 'week') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 35);
    groupFormat = '%Y-%U'; // Format pour regrouper par semaine (numéro de semaine)
  } else {
    return res.status(400).json({ message: 'Invalid period' });
  }
  
  endDate = new Date();

  try {
    // Pipeline d'agrégation
    const salesData = await Product.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $unwind: '$categories' // Séparer chaque catégorie dans son propre document
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      {
        $unwind: '$categoryData' // Extraire les informations de la catégorie
      },
      {
        $group: {
          _id: {
            date: { 
              $dateToString: { format: groupFormat, date: '$createdAt' } 
            },
            category: '$categoryData.name'
          },
          totalSales: { $sum: '$sales' },
          totalItems: { $sum: 1 } // Compter le nombre de produits
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          category: '$_id.category',
          averageBasket: { 
            $cond: { 
              if: { $eq: ['$totalItems', 0] }, 
              then: 0, 
              else: { $divide: ['$totalSales', '$totalItems'] }
            }
          }
        }
      },
      {
        $sort: { date: 1, category: 1 }
      }
    ]);

    // Envoyer les données au client
    res.json(salesData);
  } catch (error) {
    console.error('Error during aggregation:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


/*un graphique « camembert » qui affiche le volume de vente par catégorie sur les
7 derniers jours, modifiable sur une période des 5 dernières semaines ;*/

/*faire une api + tester sur postman + ajouter service api et redux apres lajouter sur le front*/

exports.getSalesByCategory = async (req, res) => {
  const period = req.query.period || 'day'; // 'day' pour 7 jours, 'week' pour 5 semaines
  let startDate, endDate;

  // Définir la période
  if (period === 'day') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Derniers 7 jours
  } else if (period === 'week') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 35); // Dernières 5 semaines
  } else {
    return res.status(400).json({ message: 'Invalid period' });
  }

  endDate = new Date();

  try {
    // Pipeline d'agrégation
    const salesData = await Product.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate } // Filtre les produits dans la période définie
        }
      },
      {
        $unwind: '$categories' // Détache les catégories pour pouvoir les regrouper
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      {
        $unwind: '$categoryData' // Récupère les informations des catégories
      },
      {
        $group: {
          _id: '$categoryData.name', // Groupe par nom de catégorie
          totalSales: { $sum: '$sales' } // Somme des ventes par catégorie
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          totalSales: 1 // Affiche la catégorie et le total des ventes
        }
      },
      {
        $sort: { totalSales: -1 } // Trie par ventes décroissantes (facultatif)
      }
    ]);

    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales by category:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
