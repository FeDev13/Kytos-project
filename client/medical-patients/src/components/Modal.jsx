/* eslint-disable react/prop-types */
import { CgCloseO } from "react-icons/cg";
import moment from "moment";
import { Pdf } from "./pdf";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
} from "@react-pdf/renderer";

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
    //appointment,
    medicalEntity,
  } = indicatorsPatient;

  const generatePDF = () => {
    const MyDocument = () => (
      <Document>
        <Page>
          <Image src="../assets/Logo kytos_page-0001.jpg" />
          <Text>
            Nombre: {indicatorsPatient.name} {indicatorsPatient.lastName}
          </Text>
          <Text>Edad: {indicatorsPatient.age}</Text>
          <Text>Diagnosis: {indicatorsPatient.diagnostic}</Text>
          <Text>Symptoms: {indicatorsPatient.symptoms.join(", ")}</Text>
          {/* Include other patient data as needed */}
        </Page>
      </Document>
    );

    const pdfBlob = <MyDocument />;

    return (
      <PDFDownloadLink document={pdfBlob} fileName="historia_clinica.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    );
  };

  return (
    <>
      <div className=" w-[100%] mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm bg-white/30">
        <div className="relative my-6 mx-auto w-1/2 h-[90%]">
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

                  <PDFDownloadLink
                    document={<Pdf patientData={indicatorsPatient} />}
                    fileName="historia_clinica.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        "Loading document..."
                      ) : (
                        <button className=" bg-blue-500 rounded-md p-2 text-white">
                          Descargar
                        </button>
                      )
                    }
                  </PDFDownloadLink>
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
