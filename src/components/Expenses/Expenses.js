import React,{ useState , Suspense } from "react";
// import ExpenseItem from "./ExpenseItem";
// import ExpenseFilter from "./ExpenseFilter";
// import Chart from "../Chart/Chart";
const ExpenseItem = React.lazy(() => import("./ExpenseItem"))
const ExpenseFilter = React.lazy(() => import("./ExpenseFilter"))
const Chart = React.lazy(() => import("../Chart/Chart"))


const Expenses = (props) => {
  const [year, setYear] = useState("2022");

  const filteredArray = props.expenses.filter((expenses) => {
    return year === expenses.date.getFullYear().toString();
  });

  if (filteredArray.length === 0) {
    return (
      <>
      <Suspense fallback={<p>Loading...</p>}>

        <Chart data={filteredArray} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>

        <ExpenseFilter value={year} postYear={setYear} />
        </Suspense>
        <p className="no-data">No expenses found !!</p>
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>

      <Chart data={filteredArray} />
        </Suspense>

      <Suspense fallback={<p>Loading...</p>}>

      <ExpenseFilter value={year} postYear={setYear} />
      {filteredArray.map((expenses) => (
        <ExpenseItem
          key={expenses.id}
          title={expenses.title}
          amount={expenses.amount}
          date={expenses.date}
        />
      ))}
        </Suspense>

    </>
  );
};
export default Expenses;
