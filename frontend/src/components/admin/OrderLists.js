import React, { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { allOrders, deleteOrder, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
const OrderLists = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.updateOrder);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (isDeleted) {
      alert.success("Orders successfully deleted");
      navigate("/admin/orders");
      dispatch({
        type: DELETE_ORDER_RESET,
      });
    }
  }, [dispatch, error, alert, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2 "
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">ALL ORDERS</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-4"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderLists;
