import { useState } from "react";

type Entry = { label: string; value: number; checked: boolean };

const makeTable = (labels: string[]) =>
  labels.map((label) => ({
    label,
    value: Math.floor(Math.random() * 20) + 1,
    checked: false,
  }));

export default function App() {
  const [tables, setTables] = useState([
    makeTable(["Item A1", "Item A2", "Item A3"]),
    makeTable(["Item B1", "Item B2", "Item B3"]),
    makeTable(["Item C1", "Item C2", "Item C3"]),
    makeTable(["Item D1", "Item D2", "Item D3"]),
  ]);

  const [table5] = useState({ label: "Special Value", value: 50 });

  const toggleCheck = (ti: number, ei: number) => {
    setTables((prev) => {
      const copy = [...prev];
      copy[ti][ei].checked = !copy[ti][ei].checked;
      return copy;
    });
  };

  const tableSum = (table: Entry[]) => table.reduce((sum, e) => (e.checked ? sum + e.value : sum), 0);

  const grandTotal = tables.reduce((sum, t) => sum + tableSum(t), 0) + table5.value;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Checklist App</h1>

      {tables.map((table, ti) => (
        <div key={ti} style={{ marginBottom: "20px" }}>
          <h2>Table {ti + 1}</h2>
          <table border={1} cellPadding={5}>
            <thead>
              <tr>
                <th>Check</th>
                <th>Label</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {table.map((entry, ei) => (
                <tr key={ei}>
                  <td>
                    <input type="checkbox" checked={entry.checked} onChange={() => toggleCheck(ti, ei)} />
                  </td>
                  <td>{entry.label}</td>
                  <td>{entry.value}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <strong>Sum</strong>
                </td>
                <td>
                  <strong>{tableSum(table)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}

      <div style={{ marginBottom: "20px" }}>
        <h2>Table 5 (Separate)</h2>
        <table border={1} cellPadding={5}>
          <tbody>
            <tr>
              <td>{table5.label}</td>
              <td>{table5.value}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Grand Total: {grandTotal}</h2>

      <button onClick={() => window.print()}>Print</button>
    </div>
  );
}
