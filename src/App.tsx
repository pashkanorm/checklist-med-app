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
        "Варикоз вен в нижних конечностях",
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
    { label: "Активный рак (химиотерапия в ближайшие 6 мес. или паллиативное лечение)", value: 1, checked: false },
    { label: "Паралич, парез или иммобилизация нижней конечности", value: 1, checked: false },

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

  // Static non-functional table data (4 columns, 4 rows)
  const nonFunctionalTableHeaders = [
    "Сумма баллов факторов риска",
    "Частота ТГВ",
    "Уровень риска",
    "Режим профилактики",
  ];
  const nonFunctionalTableRows = [
    ["0-1", "<10%", "Низкий риск", "Специальные мероприятия не требуются, показана ранняя активизация пациента"],
    ["2", "10-20%", "Умеренный риск", "НД НФГ (каждые 12 часов)/НМГ или НОАК"],
    ["3-4", "20-40%", "Высокий риск", "НД НФГ (каждые 8 часов)/НМГ или НОАК"],
    ["5 и более", "40-80%", "Очень высокий риск", "НД НФГ (каждые 8 часов)/НМГ или НОАК"],
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          font-size: 7.5px;
          line-height: 1.0;
          user-select: none;
          background: white;
          color: black;
        }
        .app-container {
          padding: 3px 5px;
          max-width: 980px;
          margin: auto;
        }
        .faint-text {
          color: #666;
          opacity: 0.3;
          font-size: 0.55rem;
          margin-bottom: 2px;
          user-select: none;
        }
        .centered-block {
          max-width: 700px;
          margin: 0 auto 6px auto;
          user-select: text;
        }
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 6px; /* increased from 2px */
          font-size: 0.75rem;
        }
        .main-title {
          font-weight: 700;
          font-size: 0.85rem;
          line-height: 1.0;
          margin: 0;
          user-select: text;
        }
        .patient-info {
          font-size: 0.65rem;
          margin-bottom: 12px; /* increased from 6px */
          user-select: text;
        }
        .tables-wrapper {
          display: flex;
          justify-content: space-between;
          gap: 6px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .left-column,
        .right-column {
          flex-basis: 48%;
          min-width: 260px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        /* Add margin-bottom to first table in each column for extra spacing */
        .left-column table:first-child {
          margin-bottom: 6px;
        }
        .right-column table:first-child {
          margin-bottom: 6px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          font-size: 0.6rem;
          line-height: 1.1;
        }
        th,
        td {
          border: 1px solid #444;
          padding: 1.5px 3px;
        }
        thead tr {
          background-color: #eee;
          font-weight: 600;
        }
        tbody tr:hover {
          background-color: #f5f5f5;
        }
        .table-title-row td {
          background-color: #eee;
          font-weight: 600;
          padding: 3px 4px;
          font-size: 0.6rem;
          user-select: none;
          border-bottom: 1.5px solid #444; /* keep bottom border under title */
        }
        /* Remove horizontal lines between tbody rows for tables 1-4 */
        .compact-table tbody tr:not(.table-title-row) td {
          border-top: none;
          border-bottom: none;
        }
        label {
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
        }

        /* Checkbox styles for white background and normal black checkmark */
        input[type="checkbox"] {
          width: 13px;
          height: 13px;
          margin-right: 4px;
          cursor: pointer;
          background-color: white !important;
          border: 1.5px solid #444 !important;
          -webkit-appearance: checkbox;
          appearance: checkbox;
          vertical-align: middle;
        }
        input[type="checkbox"]:checked {
          background-color: white !important;
        }

        .sum-text {
          font-weight: 700;
          padding: 3px 4px;
          text-align: right;
          user-select: none;
          font-size: 0.65rem;
        }
        .totals-wrapper {
          flex-basis: 48%;
          min-width: 260px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-weight: normal;
          font-size: 0.75rem;
          margin-top: 20px;
          user-select: none;
        }
        .non-functional-table {
          margin: 6px auto 4px auto;
          width: 90%;
          font-size: 0.55rem;
          table-layout: fixed;
          word-wrap: break-word;
        }
        .non-functional-table th,
        .non-functional-table td {
          padding: 2px 3px;
        }
        .app-footer-text {
          font-size: 0.45rem;
          margin-top: 0;
          margin-bottom: 3px;
          user-select: none;
          text-align: left;
          color: #666;
          opacity: 0.3;
          font-weight: 400;
        }
        .app-footer-text-bold {
          font-weight: 700;
          font-size: 0.6rem;
          text-align: center;
          margin: 1px 0 5px 0;
          user-select: none;
        }
        @media print {
          body {
            margin: 0;
            font-size: 10pt;
            line-height: 1.1;
            background: white !important;
            color: black !important;
          }
          .app-container {
            padding: 0;
            max-width: 100%;
          }
          input[type="checkbox"] {
            /* Show checkboxes in print */
            transform: scale(1) !important;
          }
        }
      `}</style>

      <div className="app-container">
        <div className="faint-text">Приложение 1</div>

        <div className="centered-block">
          <div className="header-row">
            <h1 className="main-title">Оценка факторов риска тромбоза</h1>
            <div style={{ userSelect: "text" }}>Дата _______</div>
          </div>

          <div className="patient-info">
            Ф.И.О. пациента ____________________________________________________ Возраст ___ Пол ____
          </div>
        </div>

        <div className="tables-wrapper">
          {/* Left column: Table 1 and Table 2 */}
          <div className="left-column">
            {[0, 1].map((idx) => (
              <table key={idx} cellPadding={4} border={1} className="compact-table">
                <tbody>
                  {/* Title row */}
                  <tr className="table-title-row">
                    <td colSpan={1}>{tableTitles[idx]}</td>
                  </tr>

                  {/* Entries */}
                  {tables[idx].map((entry, ei) => (
                    <tr key={ei}>
                      <td>
                        <label>
                          <input type="checkbox" checked={entry.checked} onChange={() => toggleCheck(idx, ei)} />
                          {entry.label}
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>

          {/* Right column: Table 3 and Table 4 */}
          <div className="right-column">
            {[2, 3].map((idx) => (
              <table key={idx} cellPadding={4} border={1} className="compact-table">
                <tbody>
                  {/* Title row */}
                  <tr className="table-title-row">
                    <td colSpan={1}>{tableTitles[idx]}</td>
                  </tr>

                  {/* Entries */}
                  {tables[idx].map((entry, ei) => (
                    <tr key={ei}>
                      <td>
                        <label>
                          <input type="checkbox" checked={entry.checked} onChange={() => toggleCheck(idx, ei)} />
                          {entry.label}
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}

            {/* Totals below tables 3 and 4 */}
            <div className="totals-wrapper">
              <div>Сумма баллов по Caprini: {capriniSum}</div>
              <div>Сумма баллов по Wells: {wellsSum}</div>
            </div>
          </div>
        </div>

        {/* Below left column (below table 2) the non-functional 4-column 4-row table */}
        <table
          className="non-functional-table"
          cellPadding={2}
          border={1}
          style={{ marginTop: 5, marginBottom: 3, tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th>{nonFunctionalTableHeaders[0]}</th>
              <th>{nonFunctionalTableHeaders[1]}</th>
              <th>{nonFunctionalTableHeaders[2]}</th>
              <th>{nonFunctionalTableHeaders[3]}</th>
            </tr>
          </thead>
          <tbody>
            {nonFunctionalTableRows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <p className="app-footer-text">Приложение 4</p>
        <p className="app-footer-text-bold">Шкала оценки вероятности тромбоза глубоких вен Wells P.S.</p>

        {/* Table 5 */}
        <table cellPadding={3} border={1} style={{ marginBottom: 7, fontSize: "0.6rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee", fontWeight: "bold" }}>
              <th style={{ padding: "4px" }}>Клиническая особенность</th>
              <th style={{ padding: "4px", width: "80px" }}>Баллы</th>
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
                      style={{ marginRight: "4px" }}
                    />
                    {entry.label}
                  </label>
                </td>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>{entry.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
