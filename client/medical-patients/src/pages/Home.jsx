import { Sidebar } from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Topbar } from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { useCookies } from "react-cookie";
import { MyContext } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const Home = () => {
  const professionalID = window.localStorage.getItem("professionalID");
  const [cookies] = useCookies(["access_token"]);
  const [admin, setAdmin] = useState(false);
  const {
    patients,
    setPatients,
    urgentPatientsIDs,
    setUrgentPatientsIDs,
    urgentsPatients,
    setUrgentsPatients,
    indicatorsPatient,
    setIndicatorsPatient,
    loading,
    setLoading,
    viewModal,
    setViewModal,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const getProfessionalById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5055/auth/${professionalID}`
      );
      if (res.data.userType == "Admin") {
        setAdmin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPatientsForThisProfessional = async () => {
    try {
      const res = await axios.get(
        `https://localhost:5055/patients/homePatients?professionalID=${professionalID}`
      );
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPatients = async () => {
    try {
      const res = await axios.get(`http://localhost:5055/patients/allPatients`);
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUrgentsPatientsIDs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5055/patients/urgentPatientsIDs?professionalID=${professionalID}`
      );
      setUrgentPatientsIDs(res.data.urgentPatients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatients();
    getProfessionalById();
    getUrgentsPatientsIDs();
    setLoading(false);
  }, []);

  const savedUrgentPatient = async (patientID) => {
    try {
      const res = await axios.put(
        "http://localhost:5055/patients/urgentPatients",
        {
          professionalID,
          patientID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      await getUrgentsPatientsIDs();
      setUrgentsPatients([...urgentsPatients, res.data]);
      toast.success("The patient was added as urgent!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePatient = async (el) => {
    const { _id, name, lastName } = el;
    const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
    const formatedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const patientID = _id;
    let isDelete = window.confirm(
      `Are you sure to delete the patient: ${formatedName} - ${formatedLastName}?`
    );
    if (isDelete) {
      try {
        await axios.delete(
          `http://localhost:5055/patients/deletePatient/${professionalID}/${patientID}`
        );
        await getPatientsForThisProfessional();
        toast.success("Deleted patient", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const seeIndicatorsPatient = (el) => {
    console.log(el);
    setIndicatorsPatient(el);
    setViewModal(true);
  };

  const sortedPatients = [...patients].sort((a, b) => {
    const lastNameA = a.lastName.toUpperCase();
    const lastNameB = b.lastName.toUpperCase();
  
    if (lastNameA < lastNameB) {
      return -1;
    }
    if (lastNameA > lastNameB) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="w-full m-auto overflow-y-hidden">
      <Topbar />
      <div className="w-screen font-PTSans md:flex ">
        <Sidebar />
        {loading ? (
          <div className="w-full h-screen m-auto flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="p-4 flex-col gap-4 w-full  overflow-y-auto ">
              <h1 className="w-3/4 m-auto px-4 font-PTSans font-bold text-3xl text-logo">
                Pacientes
              </h1>
              {viewModal && (
                <Modal
                  indicatorsPatient={indicatorsPatient}
                  setViewModal={setViewModal}
                />
              )}

              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
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
                          Profesional tratante
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Proximo turno
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                        >
                          Historia clinica
                        </th>
                        {admin ? (
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                          >
                            Accion
                          </th>
                        ) : null}
                      </tr>
                    </thead> 
                    {sortedPatients.map((el) => (
                      <tbody key={el} className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {el.dni}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {el.lastName + " " + el.name}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {el.attendingProfessional}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {moment(el.appointment).format("DD-MM-YYYY")}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <div className=" flex justify-around">
                              <button
                                className="text-green-500 hover:text-green-700"
                                onClick={() => seeIndicatorsPatient(el)}
                              >
                                Ver historia
                              </button>
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => navigate(`/update/${el._id}`)}
                              >
                                Actualizar historia
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            {admin ? (
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={deletePatient}
                              >
                                Eliminar
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
        <ToastContainer autoClose={2500} />
      </div>
    </div>
  );
};
