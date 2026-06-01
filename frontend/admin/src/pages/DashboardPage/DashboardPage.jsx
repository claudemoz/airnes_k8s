import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Select } from "antd";
import { FiUsers } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { CgTimelapse } from "react-icons/cg";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import {
  fetchSalesHistogram,
  fetchAverageBasketHistogram,
  fetchSalesByCategory,
} from "../../redux/slices/products";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import moment from "moment";
import dayjs from "dayjs";
//it works!!! i need the third one :
/**/
const { Option } = Select;

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { isLoadingSales, errorSales, salesData } = useSelector(
    (state) => state.products
  );
  const { isLoadingAverageBasket, errorAverageBasket, averageBasketData } =
    useSelector((state) => state.products);
  const {
    isLoadingSalesByCategory,
    errorSalesByCategory,
    SalesByCategoryData,
  } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);

  const [period, setPeriod] = React.useState("day");
  const [period2, setPeriod2] = React.useState("day");
  const [period3, setPeriod3] = React.useState("day");

  useEffect(() => {
    dispatch(fetchSalesHistogram(period));
  }, [dispatch, period]);

  useEffect(() => {
    dispatch(fetchAverageBasketHistogram(period2));
  }, [dispatch, period2]);

  useEffect(() => {
    dispatch(fetchSalesByCategory(period3));
  }, [dispatch, period3]);

  // Fonction pour formater les données pour le graphique des ventes
  const formatChartData = () => {
    if (!salesData) {
      return [];
    }

    return salesData.map((item) => {
      let formattedDate;

      if (period === "week") {
        const [year, week] = item._id.split("-");
        formattedDate = `Semaine ${week} (${year})`;
      } else {
        formattedDate = item._id;
      }

      return {
        date: formattedDate,
        total: item.total,
      };
    });
  };

  // Fonction pour formater les données pour le graphique du panier moyen avec les catégories
  const formatAverageBasketData = () => {
    if (!averageBasketData) {
      return [];
    }

    // Regrouper les données par date et par catégorie
    const dataByDate = averageBasketData.reduce((acc, item) => {
      const { date, category, averageBasket } = item;
      if (!acc[date]) {
        acc[date] = {};
      }
      acc[date][category] = averageBasket;
      return acc;
    }, {});

    // Convertir l'objet en tableau de données pour Recharts
    return Object.keys(dataByDate).map((date) => {
      return {
        date,
        ...dataByDate[date], // Ajoute les catégories avec leurs valeurs
      };
    });
  };

  // Fonction pour formater les données pour le graphique en camembert
  const formatPieChartData = () => {
    if (!SalesByCategoryData) {
      return [];
    }

    return SalesByCategoryData.map((item) => ({
      name: item.category,
      value: item.totalSales,
    }));
  };

  // Formatter de date pour l'axe X
  const formatXAxisDate = (tickItem) => {
    if (period2 === "day") {
      return moment(tickItem).format("DD MMM");
    } else if (period2 === "week") {
      const [year, week] = tickItem.split("-");
      const startOfWeek = moment()
        .year(year)
        .week(week)
        .startOf("week")
        .format("DD MMM YYYY");
      const endOfWeek = moment()
        .year(year)
        .week(week)
        .endOf("week")
        .format("DD MMM YYYY");
      return `Semaine ${week} (${startOfWeek} - ${endOfWeek})`;
    }
    return tickItem;
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
  };

  const handlePeriodChange2 = (value) => {
    setPeriod2(value);
  };

  const handlePeriodChange3 = (value) => {
    setPeriod3(value);
  };

  const { user } = useSelector((state) => state.auth);
  console.log("dayjs.locale() ", dayjs.locale("fr"));

  return (
    <div className="flex flex-col">
      <div className="flex space-x-2">
        <Card bordered={false} style={{ width: 600 }} className="1/3 p-10">
          <h1 className="text-2xl text-center font-medium">
            Bonjour, {`${user.firstname}`}{" "}
          </h1>
          <h3 className="text-xl text-center font-medium">
            Nous sommes le{" "}
            {dayjs(Date.now()).locale("fr").format("D MMMM YYYY")}
          </h3>
        </Card>
        <Card
          title="Statistiques"
          bordered={false}
          style={{ width: "100%" }}
          className="2/3 flex flex-col justify-between"
        >
          <div className="flex justify-between">
            <div className="flex space-x-3 items-center">
              <CgTimelapse size={40} color="#a29bfe" />
              <div className="flex flex-col">
                <h1 className="text-2xl">8.549k</h1>
                <h2>Ventes</h2>
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              <BsCart3 size={40} color="#74b9ff" />
              <div className="flex flex-col">
                <h1 className="text-2xl">8.549k</h1>
                <h2>Produits</h2>
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              <FiUsers size={40} color="#ff7675" />
              <div className="flex flex-col">
                <h1 className="text-2xl">8.549k</h1>
                <h2>Clients</h2>
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              <RiMoneyEuroCircleLine size={40} color="#55efc4" />
              <div className="flex flex-col">
                <h1 className="text-2xl">8.549k</h1>
                <h2>Recettes</h2>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex items-center gap-2">
        {/* Section pour les ventes: un histogramme avec le total par jour des ventes sur les 7 derniers jours,
période modifiable en total par semaine sur les 5 dernières semaines ; */}
        <div className="mt-2 w-1/3">
          <Card
            title={`Total des ventes par ${
              period === "day"
                ? "jour (7 derniers jours)"
                : "semaine (5 dernières semaines)"
            }`}
            bordered={false}
            style={{ width: "100%" }}
          >
            <div className="flex justify-end">
              <Select
                defaultValue="day"
                style={{ width: 120, marginBottom: 20 }}
                onChange={handlePeriodChange}
              >
                <Option value="day">Jour</Option>
                <Option value="week">Semaine</Option>
              </Select>
            </div>
            {isLoadingSales ? (
              <p>Loading...</p>
            ) : errorSales ? (
              <p>Error: {errorSales}</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={formatChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>

        {/* Section pour le panier moyen :une histogramme multi-couches avec le total par catégories des paniers moyens sur les 7 derniers jours, modifiable sur une période des 5 dernières semaines ;*/}
        <div className="mt-2 w-1/3">
          <Card
            title={`Panier moyen par ${
              period2 === "day"
                ? "jour (7 derniers jours)"
                : "semaine (5 dernières semaines)"
            }`}
            bordered={false}
            style={{ width: "100%" }}
          >
            <div className="flex justify-end">
              <Select
                defaultValue="day"
                style={{ width: 120, marginBottom: 20 }}
                onChange={handlePeriodChange2}
              >
                <Option value="day">Jour</Option>
                <Option value="week">Semaine</Option>
              </Select>
            </div>
            {isLoadingAverageBasket ? (
              <p>Loading...</p>
            ) : errorAverageBasket ? (
              <p>Error: {errorAverageBasket}</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={formatAverageBasketData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatXAxisDate} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {categories?.map((category) => (
                    <Bar
                      key={category._id}
                      dataKey={category.name}
                      fill={category.color}
                      stackId="a"
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>

        {/* Section pour le camombard:Section pour le graphique en camembert (Pie Chart): un graphique « camembert » qui affiche le volume de vente par catégorie sur les 7 derniers jours, modifiable sur une période des 5 dernières semaines ;*/}

        <div className="mt-2 w-1/3">
          <Card
            title={`Ventes par catégorie (${
              period3 === "day" ? "7 derniers jours" : "5 dernières semaines"
            })`}
            bordered={false}
            style={{ width: "100%" }}
          >
            <div className="flex justify-end">
              <Select
                defaultValue="day"
                style={{ width: 120, marginBottom: 20 }}
                onChange={handlePeriodChange3}
              >
                <Option value="day">Jour</Option>
                <Option value="week">Semaine</Option>
              </Select>
            </div>

            {isLoadingSalesByCategory ? (
              <p>Loading...</p>
            ) : errorSalesByCategory ? (
              <p>Error: {errorSalesByCategory}</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={formatPieChartData()} // Utilise la fonction formatée pour les données
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label
                  >
                    {categories?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
