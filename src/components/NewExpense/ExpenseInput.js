import React,{ Suspense } from "react";
// import ExpenseForm from "./ExpenseForm";
import "./Expenses-inputStyles/ExpensesInput.css";
const ExpenseForm = React.lazy(() => import("./ExpenseForm"))

const ExpenseInput = (props) => {
  const PostDataHandler = (data) => {
    const expenseData = {
      ...data,
      id: Math.random() * 1000,
    };
    props.itemData(expenseData);
  };
  // const [currentUI, setUI] = useState(1);

  // const onAddHandler = () => {
  //   setUI(2);
  // };

  // if (currentUI === 1) {
  //   return (
  //     <button className="button-add-ui" onClick={onAddHandler}>
  //       + Add New Expense
  //     </button>
  //   );
  // }

  return (
    <div className="form-container">
      <Suspense fallback={<p>Loading...</p>}>
      <ExpenseForm postData={PostDataHandler} />
      </Suspense>
    </div>
  );
};
export default ExpenseInput;
