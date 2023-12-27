/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

export const Pdf = ({ patientData }) => {
  const { name, lastName, age, diagnostic, symptoms, treatment } = patientData;
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Image
            src="https://react-pdf.org/static/images/luke.jpg"
            style={styles.image}
          />
          <Text>
            Nombre: {name} {lastName}
          </Text>
          <Text>Edad: {age}</Text>
          <Text>Diagnostico: {diagnostic}</Text>
          <Text>Sintomas: {symptoms.join(", ")}</Text>
          <Text>Tratamiento: {treatment}</Text>
          {/* Add more Text components with other patient data */}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
  image: {
    borderRadius: 20,
  },
});
