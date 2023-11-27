/* eslint-disable react/prop-types */

export const Modal = ({ indicatorsPatient, setViewModal }) => {
  const {
    dni,
    name,
    lastName,
    //age,
    //height,
    //weight,
    diagnostic,
    //symptoms,
    appointment,
  } = indicatorsPatient;
  return (
    <>
      <div className=" w-[100%] mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm bg-white/30">
        <div className="relative my-6 mx-auto max-w-3xl w-96">
          {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
         
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t bg-white">
              <h3 className="text-2xl font-semibold capitalize font-PTSans bg-white">
                {name} {lastName}
              </h3>
            </div>
        
            <div className="relative p-6 flex-auto text-lg bg-white">
              <ul className=" bg-white">
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Edad: {age} años.
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Peso: {weight} kg.
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Altura: {height} cms.
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  IMC: {(weight / (height * height)).toFixed(2)} kg/m²
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Sintomas:
                </li>
                {symptoms
                  .join(", ")
                  .split(",")
                  .map((symp, idx) => (
                    <li
                      className="text-slate-500 font-PTSans text-center bg-white"
                      key={idx}
                    >
                      {symp.trim()}.
                    </li>
                  ))}
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Diagnostico: {diagnostic}.
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Proxima cita: {appointment}.
                </li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b bg-white">
              <button
                className="bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-white"
                type="button"
                onClick={() => setViewModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div> */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3 pl-4">
                  <div className="flex items-center h-5">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox" className="sr-only">
                      Checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  DNI
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Nombre y apellido
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Diagnostico
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Proximo turno
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                ></th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className=" bg-white">
                <td className="py-3 pl-4">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox" className="sr-only">
                      Checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {dni}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {name + " " + lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {diagnostic}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {appointment}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button className="text-blue-500 hover:text-blue-700">
                    Editar historia
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setViewModal(false)}
                  >
                    Cerrar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
