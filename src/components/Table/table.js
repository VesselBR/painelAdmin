import React  from "react";

import ClearIcon from "@mui/icons-material/Clear";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useState } from "react";

export default function Table({ columns = [], data = [], onEdit, onDelete, onView }) {
  const [disabledRows, setDisabledRows] = useState([]);
  if (!Array.isArray(columns) || !Array.isArray(data)) {
    return <p>Erro: Colunas ou Dados inválidos.</p>;
  }
  
  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgb(211, 211, 211),",
      }}
    >
      <table className="table table-bordered table-hover rounded ">
        <thead className="table-dark table-striped ">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            {(onEdit || onDelete) && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`style-table-td ${row.disabled ? "disabled-row" : ""}`}
            >
              {columns.map((col, index) => (
                <td key={index} className="style-table-td" style={{}}>
                  {row[col.accessor]}
                </td>
              ))}
              {(onEdit || onDelete || onView) && (
                <td className=" d-flex  ">
                  {onEdit && (
                    <button
                      className="btn    btn-sm    "
                      onClick={() => onEdit(row)}
                    >
                      <ModeEditOutlineIcon className="text-warning" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn  btn-sm  "
                      onClick={() => onDelete(row)}
                      style={{ width: 40, height: 40 }}
                      disabled={row.disabled}
                    >
                      <DeleteForeverIcon className="text-danger" />
                    </button>
                  )}
                  {onView && (
                    <button
                      className="btn btn-sm"
                      onClick={() => onView(row)}
                      style={{ width: 40, height: 40 }}
                    >
                      <VisibilityIcon className="text-primary" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
