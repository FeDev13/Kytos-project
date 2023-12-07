import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { MyContext } from "../context/PatientContext";
import { Loader } from "../components/Loader";
import { useCookies } from "react-cookie";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export const RegisterNewPatients = () => {
  const professionalID = window.localStorage.getItem("professionalID");
  const [cookies] = useCookies(["access_token"]);
  const [selectedDate, setSelectedDate] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const { loadingRegisterPatient, setLoadingRegisterPatient } =
    useContext(MyContext);

  const params = useParams();
  const patientID = params.id;
  const getPatientById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5055/patients/${patientID}`
      );

      setNewPatient(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (patientID) {
      getPatientById();
    }
  }, []);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow

    // Formatting the date to display nicely (e.g., "Monday, November 25, 2023")
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = tomorrow.toLocaleDateString(undefined, options);

    setAppointmentDate(formattedDate); // Set the appointment date
  }, []);

  const [newPatient, setNewPatient] = useState({
    name: "",
    lastName: "",
    dni: 0,
    age: 0,
    medicalEntity: "",
    weight: 0,
    height: 0,
    diagnostic: "",
    symptoms: [],
    image: "",
    appointment: "",
    attendingProfessional: "",
    professionalID: professionalID,
  });

  const createNewPatient = async () => {
    setLoadingRegisterPatient(true);
    const form = new FormData();

    for (let key in newPatient) {
      form.append(key, newPatient[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5055/patients/registerPatient",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: cookies.access_token,
          },
        }
      );
      setLoadingRegisterPatient(false);
      //console.log(res.data);
      toast.success(res.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setNewPatient({
        name: "",
        lastName: "",
        dni: 0,
        age: 0,
        medicalEntity: "",
        weight: 0,
        height: 0,
        diagnostic: "",
        symptoms: [],
        image: "",
        appointment: "",
        attendingProfessional: "",
        professionalID: professionalID,
      });
    } catch (error) {
      setLoadingRegisterPatient(false);
      toast.error(error);
    }
  };

  const updatePatient = async () => {
    setLoadingRegisterPatient(true);

    try {
      const res = await axios.put(
        `http://localhost:5055/patients/update/${patientID}`,
        newPatient
      );
      setLoadingRegisterPatient(false);
      toast.success("Paciente registrado exitosamente", {
        position: toast.POSITION.TOP_RIGHT,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({
      ...newPatient,
      [name]: value,
    });
  };

  const handleSymptomChange = (e, index) => {
    const { value } = e.target;
    // console.log({value});
    // console.log({index});
    const symptomsCopy = newPatient.symptoms;
    symptomsCopy[index] = value;
    setNewPatient({
      ...newPatient,
      symptoms: symptomsCopy,
    });
  };

  const addSymptoms = () => {
    setNewPatient({
      ...newPatient,
      symptoms: [...newPatient.symptoms, ""],
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const scheduleAppointment = () => {
    // If a date is selected, update the appointment date
    if (selectedDate) {
      setNewPatient({
        ...newPatient,
        appointment: selectedDate,
      });
      setAppointmentDate(selectedDate);
    }
  };

  const handleSubmit = async (e) => {
    //console.log(newPatient);
    e.preventDefault();
    if (patientID) {
      updatePatient();
    } else {
      createNewPatient();
    }
  };

  const isDisabled = () => {
    if (
      newPatient.name === "" ||
      newPatient.lastName === "" ||
      newPatient.age === 0 ||
      newPatient.weight === 0 ||
      newPatient.height === 0 ||
      loadingRegisterPatient === true
    )
      return true;
  };

  return (
    <div>
      <div>
        <Topbar />
      </div>
      <div className="w-full h-screen m-auto bg-[#F1F5F9] md:flex">
        <Sidebar />
        {/* CONTAINER FORM REGISTER PATIENT PAGE */}
        <div className="w-full h-screen font-PTSans bg-logo absolute -mt-96 md:relative md:mt-0">
          {/* FORM SECTION */}
          <div className="p-4 h-[calc(100%-64px) w-[90%] lg:w-[70%] mx-auto rounded-md bg-white">
            <h1 className="text-center w-3/4 m-auto px-4 font-PTSans font-bold text-3xl text-logo bg-white">
              Ingreso/modificacion paciente{" "}
            </h1>
            <div className="m-auto p-4 flex justify-center items-center mt-8 bg-white ">
              <form
                className=" flex flex-col w-80 max-w-xl bg-white"
                onSubmit={handleSubmit}
              >
                <label
                  className="font-PTSans font-bold text-logo text-lg bg-white "
                  htmlFor="attendingProfessional"
                >
                  Profesional:
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="text"
                  name="attendingProfessional"
                  value={newPatient.attendingProfessional}
                  id="attendingProfessional"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg bg-white "
                  htmlFor="name"
                >
                  Nombre:
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="text"
                  name="name"
                  value={newPatient.name}
                  id="name"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="lastName"
                >
                  Apellido:
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="text"
                  name="lastName"
                  value={newPatient.lastName}
                  id="lastName"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="age"
                >
                  Dni:
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="number"
                  name="dni"
                  value={newPatient.dni}
                  id="dni"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="age"
                >
                  Prestador medico:
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="text"
                  name="medicalEntity"
                  value={newPatient.medicalEntity}
                  id="medicalEntity"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="age"
                >
                  Edad:
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="number"
                  name="age"
                  value={newPatient.age || ""}
                  id="age"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="weight"
                >
                  Peso (kg):
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="number"
                  name="weight"
                  value={newPatient.weight || ""}
                  id="weight"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="height"
                >
                  Altura (cms):
                </label>
                <input
                  className="rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary "
                  type="number"
                  name="height"
                  value={newPatient.height || ""}
                  id="height"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="symptoms"
                >
                  Sintomas:
                </label>
                <div className="w-full grid grid-cols-2 justify-center gap-1 bg-white">
                  {newPatient.symptoms.map((el, index) => (
                    <input
                      className="w-full rounded-sm h-7 bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary  text-center"
                      key={index}
                      type="text"
                      name="symptoms"
                      value={el}
                      id="symptoms"
                      onChange={(e) => handleSymptomChange(e, index)}
                      autoComplete="off"
                      autoFocus={true}
                    />
                  ))}
                </div>
                <button
                  className="w-fit my-10 px-6 font-semibold rounded-lg h-7 bg-transparent border border-green-600 text-black shadow-lg hover:bg-green-600 hover:text-white hover:transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  type="button"
                  onClick={addSymptoms}
                  disabled={newPatient.symptoms.includes("")}
                >
                  Agregar sintomas
                </button>
                <label
                  className="font-PTSans font-bold text-logo text-lg mt-2 bg-white"
                  htmlFor="diagnostic"
                >
                  Diagnostico:
                </label>
                <textarea
                  className="resize-none rounded-xl text-sm  bg-transparent border border-solid border-tertiary outline-none px-3 py-1 font-PTSans text-terborder-tertiary"
                  name="diagnostic"
                  value={newPatient.diagnostic}
                  id="diagnostic"
                  onChange={handleChange}
                  autoComplete="off"
                  cols={50}
                  rows={2}
                />
                <label
                  className="font-PTSans font-bold text-logo text-lg  bg-white my-8"
                  htmlFor="image"
                >
                  Seleccionar proximo turno:
                </label>{" "}
                <div className="flex-col">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <div>
                    <button
                      className="w-[50%] mx-auto font-semibold rounded-lg p-1 bg-green-500 text-white my-8"
                      onClick={scheduleAppointment}
                    >
                      Agendar
                    </button>

                    {appointmentDate && (
                      <p className="font-PTSans font-bold text-logo text-lg  bg-white">
                        El proximo turno es :
                        {moment(selectedDate).format("DD-MM-YYYY")}
                      </p>
                    )}
                  </div>
                </div>
                {loadingRegisterPatient && (
                  <div className="w-full m-auto flex justify-center items-center mt-2">
                    <Loader />
                  </div>
                )}
                <div className="my-4  text-center bg-white">
                  <button
                    className="w-[50%] mx-auto font-semibold rounded-lg p-1 bg-transparent border-2 border-logo text-logo  shadow-lg hover:bg-logo hover:text-white hover:transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isDisabled()}
                  >
                    {patientID
                      ? "Actualizar paciente"
                      : "Registrar nuevo paciente"}
                  </button>
                </div>
                <Link
                  className="w-[50%] mx-auto font-semibold rounded-lg p-1  border border-red-400 text-black bg-secondary shadow-lg hover:bg-red-600 hover:text-white hover:transition-all text-center"
                  to="/home"
                >
                  Cerrar
                </Link>
              </form>
              <ToastContainer autoClose={2500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
