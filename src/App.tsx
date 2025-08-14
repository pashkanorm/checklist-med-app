import { useState, useRef } from "react";

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
  // Patient info values
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState<number | "">("");
  const [patientSex, setPatientSex] = useState("");

  // Track which input is in editing mode individually
  const [editingName, setEditingName] = useState(true);
  const [editingAge, setEditingAge] = useState(true);
  const [editingSex, setEditingSex] = useState(true);

  // Refs for autofocus
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLSelectElement>(null);

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
    { label: "Альтернативный диагноз столь же вероятен или более вероятен, чем ТГВ", value: 1, checked: false },
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
        * { box-sizing: border-box; }
        body { margin:0; padding:0; font-family:sans-serif; font-size:7.5px; line-height:1; background:white; color:black; user-select:none; }
        .app-container { padding:3px 5px; max-width:980px; margin:auto; }
        .faint-text { color:#666; opacity:0.3; font-size:0.55rem; margin-bottom:2px; user-select:none; }
        .centered-block { max-width:700px; margin:0 auto 6px auto; user-select:text; }
        .header-row { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:6px; font-size:0.75rem; }
        .main-title { font-weight:700; font-size:0.85rem; line-height:1; margin:0; user-select:text; }
        .patient-info { font-size:0.65rem; margin-bottom:12px; user-select:text; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
        .patient-info input, .patient-info select { font-size:0.65rem; padding:1px 2px; margin-right:12px; }
        .patient-text { font-weight:600; margin-right:25px; }
        .tables-wrapper { display:flex; justify-content:space-between; gap:6px; margin-bottom:6px; flex-wrap:wrap; }
        .left-column, .right-column { flex-basis:48%; min-width:260px; display:flex; flex-direction:column; gap:3px; }
        .left-column table:first-child, .right-column table:first-child { margin-bottom:6px; }
        table { border-collapse:collapse; width:100%; font-size:0.6rem; line-height:1.1; }
        th, td { border:1px solid #444; padding:1.5px 3px; }
        thead tr { background-color:#eee; font-weight:600; }
        tbody tr:hover { background-color:#f5f5f5; }
        .table-title-row td { background-color:#eee; font-weight:600; padding:3px 4px; font-size:0.6rem; user-select:none; border-bottom:1.5px solid #444; }
        .compact-table tbody tr:not(.table-title-row) td { border-top:none; border-bottom:none; }
        label { cursor:pointer; user-select:none; display:flex; align-items:center; }
        input[type="checkbox"] { -webkit-appearance:none; -moz-appearance:none; appearance:none; width:12px; height:12px; border:1.5px solid #444; border-radius:1px; background:white; cursor:pointer; position:relative; vertical-align:middle; margin-right:4px; }
        input[type="checkbox"]:checked::after { content:""; position:absolute; left:2.8px; top:0px; width:2.5px; height:7px; border:solid black; border-width:0 2px 2px 0; transform:rotate(45deg); }
        .sum-text { font-weight:700; padding:3px 4px; text-align:right; user-select:none; font-size:0.65rem; }
        .totals-wrapper { flex-basis:48%; min-width:260px; display:flex; flex-direction:column; gap:2px; font-weight:normal; font-size:0.75rem; margin-top:20px; user-select:none; }
        .non-functional-table { margin:6px auto 4px auto; width:90%; font-size:0.55rem; table-layout:fixed; word-wrap:break-word; }
        .non-functional-table th, .non-functional-table td { padding:2px 3px; }
        .app-footer-text { font-size:0.45rem; margin-top:0; margin-bottom:3px; user-select:none; text-align:left; color:#666; opacity:0.3; font-weight:400; }
        .app-footer-text-bold { font-weight:700; font-size:0.6rem; text-align:center; margin:1px 0 5px 0; user-select:none; }
        @media print { body { font-size:10pt !important; background:white !important; color:black !important; } input[type="checkbox"], input[type="text"], select { font-size:10pt !important; } }
      `}</style>

      <div className="app-container">
        <div className="faint-text">Приложение 1</div>

        <div className="centered-block">
          <div className="header-row">
            <h1 className="main-title">Оценка факторов риска тромбоза</h1>
            <div style={{ userSelect: "text" }}>Дата _______</div>
          </div>

          <div className="patient-info">
            <span>Ф.И.О. пациента</span>
            {editingName ? (
              <input
                ref={nameRef}
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                onBlur={() => setEditingName(false)}
                style={{ width: "240px" }}
              />
            ) : (
              <span
                className="patient-text"
                onDoubleClick={() => {
                  setEditingName(true);
                  setTimeout(() => nameRef.current?.focus(), 0);
                }}>
                {patientName || "__________________________"}
              </span>
            )}

            <span>Возраст</span>
            {editingAge ? (
              <input
                ref={ageRef}
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(Number(e.target.value))}
                onBlur={() => setEditingAge(false)}
                style={{ width: "50px" }}
              />
            ) : (
              <span
                className="patient-text"
                onDoubleClick={() => {
                  setEditingAge(true);
                  setTimeout(() => ageRef.current?.focus(), 0);
                }}>
                {patientAge || "__"}
              </span>
            )}

            <span>Пол</span>
            {editingSex ? (
              <select
                ref={sexRef}
                value={patientSex}
                onChange={(e) => setPatientSex(e.target.value)}
                onBlur={() => setEditingSex(false)}
                style={{ width: "70px" }}>
                <option value="" disabled hidden>
                  ---------
                </option>
                <option value="мужской">мужской</option>
                <option value="женский">женский</option>
              </select>
            ) : (
              <span
                className="patient-text"
                onDoubleClick={() => {
                  setEditingSex(true);
                  setTimeout(() => sexRef.current?.focus(), 0);
                }}>
                {patientSex || "________"}
              </span>
            )}
          </div>
        </div>

        <div className="tables-wrapper">
          <div className="left-column">
            {[0, 1].map((idx) => (
              <table key={idx} cellPadding={4} border={1} className="compact-table">
                <tbody>
                  <tr className="table-title-row">
                    <td colSpan={1}>{tableTitles[idx]}</td>
                  </tr>
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

          <div className="right-column">
            {[2, 3].map((idx) => (
              <table key={idx} cellPadding={4} border={1} className="compact-table">
                <tbody>
                  <tr className="table-title-row">
                    <td colSpan={1}>{tableTitles[idx]}</td>
                  </tr>
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
            <div className="totals-wrapper">
              <div>Сумма баллов по Caprini: {capriniSum}</div>
              <div>Сумма баллов по Wells: {wellsSum}</div>
            </div>
          </div>
        </div>

        <table
          className="non-functional-table"
          cellPadding={2}
          border={1}
          style={{ marginTop: 5, marginBottom: 3, tableLayout: "fixed" }}>
          <thead>
            <tr>
              {nonFunctionalTableHeaders.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
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
