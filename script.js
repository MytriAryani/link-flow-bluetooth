const shareButton = document.querySelector("#share-button");

shareButton.addEventListener("click", async () => {
    const name = document.querySelector("#name").value.trim();
    const phone = document.querySelector("#phone").value.trim();

    
    const data = {
        name,
        phone
    };
    const jsonString = JSON.stringify(data, null, 2);

    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: false,  
            filters: [{
                name: "vivo Y100",
                services: ['0000ffe0-0000-1000-8000-00805f9b34fb']  
            }]
        });
        const server = await device.gatt.connect();      
        const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
        const characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(jsonString);
        await characteristic.writeValue(dataBuffer);
        console.log("Data written to the characteristic.");
        const status = document.querySelector("#status");
        status.textContent = "Data sent successfully!";
        status.style.color = "green";

    } catch (error) {
        const status = document.querySelector("#status");
        status.textContent = `Error: ${error.message}`;
        status.style.color = "red";
    }
});
