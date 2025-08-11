import { useState } from "react";

type Entry = { label: string; value: number; checked: boolean };

const makeTable = (labels: string[], valuePerEntry: number) =>
  labels.map((label) => ({
    label,
    value: valuePerEntry,
    checked: false,
  }));

const tableTitles = [
  "Каждый фактор риска соответствует 1 баллу:",
  "Каждый фактор риска соответствует 2 баллам:",
  "Каждый фактор риска соответствует 3 баллам:",
  "Каждый фактор риска соответствует 5 баллам:",
];

export default function App() {
  const [tables, setTables] = useState([
    makeTable(
      [
        "Возраст 41-60 лет",
        "Отек нижних конечностей",
        "Варикозные вены",
        "Индекс массы тела более 25кг/м2",
        "Малое хирургическое вмешательство",
        "Сепсис (<1 месяца)",
        "Серьезное заболевание легких, включая пневмонию (<1 месяца)",
        "Прием оральных контрацептивов, гормонозаместительная терапия",
        "Острым инфаркт миокарда в анамнезе",
        "Хроническая сердечная недостаточность (<1 месяца)",
        "Постельным режим у нехирургического пациента",
        "Воспалительные заболевания кишечника в анамнезе",
        "Большое хирургическое вмешательство в анамнезе (<1 месяца)",
        "ХОЗЛ в анамнезе",
        "СД в анамнезе",
        "Варикоз вен в нижних конечностей",
      ],
      1
    ),
    makeTable(
      [
        "Возраст 61-74 года",
        "Злокачественное новообразование (сейчас или в анамнезе)",
        "Лапараскопическое вмешательство (>45 мин)",
        "Постельный режим более 72 ч",
        "Иммобилизация конечности (<1 месяца)",
        "Катетеризация центральных вен",
        "Большое хирургическое вмешательство (>45 мин)",
      ],
      2
    ),
    makeTable(
      [
        "Возраст старше 75 лет",
        "ТГВ/ТЭЛА в анамнезе",
        "Мутация типа Лейден",
        "Мутация протромбина 20210А",
        "Гипергомоцистеинемия",
        "Гепарин-индуцированная тромбоцитопения в анамнезе",
        "Волчаночный антикоагулянт",
      ],
      3
    ),
    makeTable(
      [
        "Перелом костей бедра, таза, голени (<1 месяца)",
        "Инсульт (давностью до 1 мес.)",
        "Травма спинного мозга/паралич (<1 месяца)",
        "Эндопротезирование крупных суставов в анамнезе",
      ],
      5
    ),
  ]);

  const [table5, setTable5] = useState<Entry[]>([
    { label: "Активный рак (химиотерапия в ближайшие 6 мес. или паллиативное лечение)", value: 3, checked: false },
    { label: "Паралич, парез или иммобилизация нижней конечности", value: 3, checked: false },

    { label: "Постельный режим более 3 дней ", value: 1, checked: false },
    { label: "Оперативное вмешательство в анамнезе, в течение последних 4 нед.", value: 1, checked: false },

    { label: "Локальная болезненность по ходу глубоких вен", value: 1, checked: false },

    { label: "Увеличение объема нижней конечности", value: 1, checked: false },

    {
      label: "Односторонний увеличение голени более чем на 3 см (ниже большеберцового бугра)",
      value: 1,
      checked: false,
    },
    { label: "Односторонний отёк и изъязвление нижней конечности", value: 1, checked: false },

    { label: "Коллатерали поверхностных вен", value: 1, checked: false },
    { label: "Альтернативный диагноз столь же вероятен или более вероятен, чем ТГВ", value: -1, checked: false },
  ]);

  const toggleCheck = (tableIndex: number, entryIndex: number) => {
    setTables((prev) => {
      const copy = prev.map((table, i) =>
        i === tableIndex
          ? table.map((entry, j) => (j === entryIndex ? { ...entry, checked: !entry.checked } : entry))
          : table
      );
      return copy;
    });
  };

  const toggleCheckTable5 = (entryIndex: number) => {
    setTable5((prev) =>
      prev.map((entry, i) => (i === entryIndex ? { ...entry, checked: !entry.checked } : entry))
    );
  };

  const tableSum = (table: Entry[]) => table.reduce((sum, entry) => (entry.checked ? sum + entry.value : sum), 0);

  const capriniSum = tables.reduce((acc, table) => acc + tableSum(table), 0);
  const wellsSum = tableSum(table5);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Checklist App</h1>

      {tables.map((table, ti) => (
        <div key={ti} style={{ marginBottom: "20px" }}>
          <table border={1} cellPadding={5} style={{ width: "100%" }}>
            <tbody>
              {/* Title row */}
              <tr>
                <td
                  colSpan={1}
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#eee",
                    padding: "8px",
                  }}>
                  {tableTitles[ti]}
                </td>
              </tr>

              {/* Entries */}
              {table.map((entry, ei) => (
                <tr key={ei}>
                  <td>
                    <label style={{ cursor: "pointer", userSelect: "none" }}>
                      <input
                        type="checkbox"
                        checked={entry.checked}
                        onChange={() => toggleCheck(ti, ei)}
                        style={{ marginRight: "8px" }}
                      />
                      {entry.label}
                    </label>
                  </td>
                </tr>
              ))}

              {/* Sum row */}
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px" }}>Sum: {tableSum(table)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Table 5 */}
      <div style={{ marginBottom: "20px" }}>
        <table border={1} cellPadding={5} style={{ width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee", fontWeight: "bold" }}>
              <th style={{ padding: "8px" }}>Клиническая особенность</th>
              <th style={{ padding: "8px", width: "80px" }}>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {table5.map((entry, ei) => (
              <tr key={ei}>
                <td>
                  <label style={{ cursor: "pointer", userSelect: "none" }}>
                    <input
                      type="checkbox"
                      checked={entry.checked}
                      onChange={() => toggleCheckTable5(ei)}
                      style={{ marginRight: "8px" }}
                    />
                    {entry.label}
                  </label>
                </td>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>{entry.value}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ fontWeight: "bold", padding: "8px" }}>Sum:</td>
              <td style={{ fontWeight: "bold", padding: "8px", textAlign: "center" }}>{wellsSum}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Grand totals */}
      <h2>Сумма баллов по Caprini: {capriniSum}</h2>
      <h2>Сумма баллов по Wells: {wellsSum}</h2>

      <button onClick={() => window.print()}>Print</button>
    </div>
  );
}
