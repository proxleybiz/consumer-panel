import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import { Text, View } from "@react-pdf/renderer";

const InvoiceTitle = ({ title }) => {
  const styles = StyleSheet.create({
    titleContainer: {
      marginTop: 24,
    },
    reportTitle: {
      color: "#3778C2",
      letterSpacing: 4,
      fontSize: 25,
      textAlign: "center",
      textTransform: "uppercase",
    },
  });
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
};

const BillTo = ({ invoice }) => {
  const styles = StyleSheet.create({
    headerContainer: {
      marginTop: 36,
      justifyContent: "flex-start",
      width: "50%",
    },
    billTo: {
      marginTop: 20,
      paddingBottom: 3,
      fontFamily: "Helvetica-Oblique",
    },
  });
  const address = invoice.address;
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Deliver To:</Text>
      <Text>{address.addressTitle}</Text>
      <Text>{address.lineOne + ", " + address.lineTwo}</Text>
      <Text>{`Near ${address.landmark}`}</Text>
      <Text>{address.pincode}</Text>
      <Text>
        {address.city + ", " + address.state + ", " + address.country}
      </Text>
    </View>
  );
};

const InvoiceNo = ({ invoice }) => {
  const styles = StyleSheet.create({
    invoiceNoContainer: {
      flexDirection: "row",
      marginTop: 36,
      justifyContent: "flex-end",
    },
    invoiceNoContainer2: {
      flexDirection: "row",
      marginTop: 3,
      justifyContent: "flex-end",
    },
    invoiceDateContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    invoiceDate: {
      fontSize: 12,
      fontStyle: "bold",
    },
    label: {
      width: 60,
    },
  });
  const date = new Date(invoice.order_on);
  return (
    <Fragment>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.label}>Invoice No:</Text>
        <Text style={styles.invoiceDate}>{invoice._id}</Text>
      </View>
      <View style={styles.invoiceNoContainer2}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.invoiceDate}>{invoice.subTotal}</Text>
      </View>
      <View style={styles.invoiceNoContainer2}>
        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.invoiceDate}>{invoice.quantity}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Date: </Text>
        <Text>{date.toLocaleDateString()}</Text>
      </View>
    </Fragment>
  );
};

const PdfDocument = ({ invoicedata }) => {
  const customization = invoicedata.product.customization;
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      fontFamily: "Helvetica",
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 50,
      paddingRight: 50,
      lineHeight: 1.5,
      flexDirection: "column",
    },
    logo: {
      width: 84,
      height: 70,
      marginLeft: "auto",
      marginRight: "auto",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle title={"Invoice"} />
        <InvoiceNo invoice={invoicedata} />
        <BillTo invoice={invoicedata} />
        <Text style={{ marginTop: 20, fontWeight: 600 }}>
          Order Specification
        </Text>
        {customization.map((item, key) => {
          if (item.type === "FILE") {
            return (
              <Fragment key={key} className="d-flex" style={{ gap: "20px" }}>
                <Text> {item.name}: </Text>
                <Image
                  style={styles.logo}
                  src={{
                    uri: item.value,
                    method: "GET",
                    headers: { "Cache-Control": "no-cache" },
                    body: "",
                  }}
                />
              </Fragment>
            );
          } else if (item.type === "COLOR") {
            return (
              <Fragment key={key} className="d-flex" style={{ gap: "20px" }}>
                <Text> {item.name}: </Text>
                {item.value}
              </Fragment>
            );
          }
          return (
            <Text key={key} className="fs-6">
              {item.name}: {item.value}
            </Text>
          );
        })}
      </Page>
    </Document>
  );
};

function Temp({ show, handleClose, order }) {
  const filters = order.product.filters;
  const customization = order.product.customization;
  const address = order.address;
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>View your order summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PDFViewer width={"100%"} height={"80%"} showToolbar={false}>
            <PdfDocument invoicedata={order} />
          </PDFViewer>
          <div className="download-link">
            <PDFDownloadLink
              document={<PdfDocument invoicedata={order} />}
              fileName={`${order._id}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading..." : "Download Invoice"
              }
            </PDFDownloadLink>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default Temp;
