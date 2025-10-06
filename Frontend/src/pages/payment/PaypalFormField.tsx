import { PayPalCVVField, PayPalExpiryField, PayPalNameField, PayPalNumberField, usePayPalCardFields } from "@paypal/react-paypal-js"
import { useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaypalFormField = ({totalAmount,shipingFee,disableBtn}:any) => {

     const [isPaying, setIsPaying] = useState(false);

  const { cardFieldsForm } = usePayPalCardFields();
    
  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";
      alert(childErrorMessage);
      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);

    cardFieldsForm.submit().catch(() => {
      setIsPaying(false);
    });
  };
  return (
    <>
    <PayPalNameField
                      style={{
                        input: { color: "blue" },
                        ".invalid": { color: "purple" },
                      }}
                    />
                    <PayPalNumberField />
                    <PayPalExpiryField />
                    <PayPalCVVField />
                    <button
                      className="rounded-md p-3 w-full bg-blue-600 cursor-pointer"
                      disabled={disableBtn}
                      onClick={handleClick}
                    >
                      {isPaying ? (
                        <p className="text-white underline">Paying</p>
                      ) : (
                        <p className="text-white underline">
                          Pay {totalAmount + shipingFee}
                        </p>
                      )}
                    </button>
    </>
  )
}

export default PaypalFormField
