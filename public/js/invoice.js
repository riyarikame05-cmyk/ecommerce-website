function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}
async function downloadInvoice(orderId) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(`/api/invoice/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {

            alert("Invoice download failed.");

            return;

        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = `Invoice-${orderId}.pdf`;

        document.body.appendChild(a);

        a.click();

        a.remove();

        window.URL.revokeObjectURL(url);

    }

    catch(err){

        console.log(err);

        alert("Unable to download invoice.");

    }

}