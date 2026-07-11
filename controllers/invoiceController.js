const PDFDocument = require("pdfkit");
const Order = require("../models/Order");

exports.downloadInvoice = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("user")
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Invoice-${order._id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(22)
           .text("ShopEase Invoice", {
                align: "center"
           });

        doc.moveDown();

        doc.fontSize(12)
           .text(`Invoice ID : ${order._id}`);

        doc.text(`Customer : ${order.user.name}`);

        doc.text(`Email : ${order.user.email}`);

        doc.text(`Address : ${order.address}`);

        doc.text(`Payment : ${order.paymentMethod}`);

        doc.text(`Status : ${order.status}`);

        doc.text(`Date : ${new Date(order.createdAt).toLocaleDateString()}`);

        doc.moveDown();

        doc.fontSize(16)
           .text("Products");

        doc.moveDown(0.5);

        order.items.forEach(item => {

            doc.fontSize(12)
               .text(
                    `${item.product.name}
                     | Qty : ${item.quantity}
                     | ₹${item.product.price}`
               );

        });

        doc.moveDown();

        doc.fontSize(18)
           .text(
                `Total : ₹${order.total}`,
                {
                    align: "right"
                }
           );

        doc.moveDown(2);

        doc.fontSize(12)
           .text(
                "Thank you for shopping with ShopEase!",
                {
                    align: "center"
                }
           );

        doc.end();

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};