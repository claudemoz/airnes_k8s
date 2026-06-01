import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, updateOrderStatus } from '@/redux/slices/orders';
import { fetchProduct } from '@/redux/slices/products';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './OrderPageDetails.module.css';
import { MdAssignmentReturn } from "react-icons/md";
import ConfirmModal from './components/ConfirmModal';
import { toast } from 'sonner';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.order);
  const products = useSelector((state) => state.products.product);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);

  const [selectedIcons, setSelectedIcons] = useState(new Set());
  const [isReturnButtonDisabled, setIsReturnButtonDisabled] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (order && order.order_items) {
      order.order_items.forEach(item => {
        dispatch(fetchProduct(item.productId)).then(action => {
          setProductDetails(prevDetails => ({
            ...prevDetails,
            [item.productId]: action.payload
          }));
        });
      });
    }
  }, [dispatch, order]);

  useEffect(() => {
    setIsReturnButtonDisabled(selectedIcons.size === 0);
  }, [selectedIcons]);

  useEffect(() => {
    if (order && order.status === 'cancelled') {
      setSelectedIcons(new Set());
    }
  }, [order]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancelOrder = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIcons(new Set());
  };

  const cancelOrder = () => {
    const updateData = { status: 'cancelled' };
    dispatch(updateOrderStatus({ orderId: order._id, updateData })).then(() => {
      toast.success("Commande annulée");
      navigate(-1);
    }).catch(error => {
      console.error('Error cancelling order:', error);
      toast.error("Erreur lors de l'annulation de la commande");
    });
  };

  const toggleIconSelection = (iconId, itemStatus) => {
    if (itemStatus !== 'returned' && order.status !== 'cancelled') {
      const updatedIcons = new Set(selectedIcons);
      if (updatedIcons.has(iconId)) {
        updatedIcons.delete(iconId);
      } else {
        updatedIcons.add(iconId);
      }
      setSelectedIcons(updatedIcons);

      const totalSelectableItems = order.order_items.filter(item => item.status !== 'returned').length;
      const allItemsSelected = totalSelectableItems === updatedIcons.size;

      if (allItemsSelected) {
        handleCancelOrder();
      }
    }
  };

  const returnSelectedProducts = () => {
    const selectedItems = order.order_items.filter(item => selectedIcons.has(item._id));
    const selectedProductDetails = selectedItems.map(item => productDetails[item.productId]);

    const updatedOrderItems = selectedItems.map(item => ({
      ...item,
      status: "returned"
    }));

    const orderId = order._id;

    navigate('/return-product', { state: { updatedOrderItems, selectedItems, selectedProductDetails, orderId } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Commande #{order.reference} - {formatDate(order.date)} - {order.status}</h1>
      
      <div className={styles.orderDetailsGrid}>
        <div className={styles.orderItemsSection}>
          {order.order_items && order.order_items.map((item) => (
            <div key={item._id} className={`${styles.orderItem} ${selectedIcons.has(item._id) ? styles.selected : ''} ${item.status === 'returned' ? styles.cancelled : ''}`}>
              {products[item.productId] && (
                <>
                  <div className={styles.itemImage}>
                    <img src={products[item.productId].images[0].url} alt={products[item.productId].name} />
                    {item.status === 'returned' && <div className={styles.cancelledBanner}>Cancelled</div>}
                  </div>
                  <div className={styles.itemDetails}>
                    <p><strong>{products[item.productId].name}</strong></p>
                    <p dangerouslySetInnerHTML={{ __html: products[item.productId].description }}></p>
                  </div>
                  <div className={styles.itemPriceQty}>
                    <div className={styles.price_item}><p><strong>Prix:</strong> {products[item.productId].price} €</p></div>
                    <div className={styles.qtity_item}><p>{item.quantity}</p></div>
                    <div className={styles.icon_item}>
                      {item.status !== 'returned' && order.status !== 'cancelled' && (
                        <MdAssignmentReturn className={`${styles.icon} ${selectedIcons.has(item._id) ? styles.selectedIcon : ''}`} onClick={() => toggleIconSelection(item._id, item.status)} />
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.orderSummarySection}>
          <div className={styles.orderSummary}>
            <h2>Total</h2>
            <p><strong>Prix total:</strong> {order.price} €</p>
            <p><strong>TVA:</strong> 0 €</p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.orderDelivery}>
            <h2>Adresse de livraison</h2>
            <p>{order.delivery.firstname} {order.delivery.lastname}</p>
            <p>{order.delivery.address}</p>
            <p>{order.delivery.city}</p>
            <p>{order.delivery.phone}</p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.orderPayment}>
            <h2>Méthode de paiement</h2>
            {order.payment_method ? (
              <>
                <p>{order.payment_method.brand}</p>
                <p>**** **** **** {order.payment_method.last4}</p>
              </>
            ) : (
              <p>Information de paiement indisponible</p>
            )}
            {order.status === 'pending' && (
              <>
                <button className={styles.cancelButton} onClick={handleCancelOrder}>Annuler la commande</button>
                <button className={`${styles.returnButton} ${isReturnButtonDisabled ? styles.returnButtonDisabled : ''}`} disabled={isReturnButtonDisabled} onClick={returnSelectedProducts}>
                  Retourner le(s) produit(s) sélectionné(s)
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal 
        show={showModal} 
        onClose={closeModal} 
        onConfirm={cancelOrder} 
      />
    </div>
  );
}
