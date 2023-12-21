/* eslint-disable react/prop-types */
import { CgCloseO } from "react-icons/cg";
import moment from "moment";


export const Modal = ({ indicatorsPatient, setViewModal }) => {
  const {
    _id,
    dni,
    name,
    lastName,
    age,
    createdAt,
    //height,
    //weight,
    diagnostic,
    symptoms,
    treatment,
    appointment,
    medicalEntity,
  } = indicatorsPatient;
  return (
    <>
      <div className=" w-[100%] mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm bg-white/30">
        <div className="relative my-6 mx-auto w-1/2 h-[90%]">
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
          <div className=" bg-white p-10 rounded-md">
            <div className="absolute top-5 right-2 p-2 px-5 cursor-pointer">
              {" "}
              <CgCloseO onClick={() => setViewModal(false)} />
            </div>

            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Historia clinica
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nro de historia clinica
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {_id}
                </dd>
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nombre y apellido
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {name + " " + lastName}
                    
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Dni
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {dni}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Edad
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {age}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Prestador medico
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {medicalEntity}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Sintomas
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {symptoms + " "}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Diagnostico
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {diagnostic}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Tratamiento
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {treatment}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Primera consulta
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {moment(createdAt).format("DD-MM-YYYY")}
                  </dd>
                </div>
                <div className=" flex justify-around p-2">
                  <button className=" bg-red-500 rounded-md p-2 text-white">
                    Eliminar
                  </button>
                  <button className=" bg-slate-500 rounded-md p-2 text-white">
                    Modificar estado
                  </button>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
