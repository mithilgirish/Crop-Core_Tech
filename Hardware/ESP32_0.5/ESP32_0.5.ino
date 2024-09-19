#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

// Define the DHT Sensor type
#define DHTTYPE DHT22

// Define the GPIO pins
#define DHTPIN 4
#define MOISTUREPIN 34  // Analog pin for the moisture sensor
#define MOTORPIN 5  // Pin to control the motor

// Wi-Fi credentials
const char* ssid = "Name";
const char* password = "Password";

// Create a WebServer object on port 80
WebServer server(80);

// Initialize the DHT sensor
DHT dht(DHTPIN, DHTTYPE);

void handleRoot() {
  String html = "<html><body><h1>ESP32 Web Server</h1>";
  html += "<p>Temperature, Humidity, and Soil Moisture:</p>";
  html += "<p><a href=\"/readings\">Get Sensor Readings</a></p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleSensorReadings() {
  // Read the DHT22 sensor data
  float humidity = dht.readHumidity();
  float temperatureC = dht.readTemperature();
  float temperatureF = dht.readTemperature(true);

  // Read the moisture sensor value (0 to 4095)
  int moistureValue = analogRead(MOISTUREPIN);

  // Map the moisture value to a percentage (0% = completely wet, 100% = completely dry)
  int moisturePercent = map(moistureValue, 0, 4095, 100, 0);

  // Check if any reads failed
  if (isnan(humidity) || isnan(temperatureC) || isnan(temperatureF)) {
    server.send(500, "application/json", "{\"error\":\"Failed to read from sensors!\"}");
    return;
  }

  // Create JSON response
  String jsonResponse = "{\"humidity\": " + String(humidity) +
                        ", \"temperatureC\": " + String(temperatureC) +
                        ", \"temperatureF\": " + String(temperatureF) +
                        ", \"moisturePercent\": " + String(moisturePercent) + "}";

  server.send(200, "application/json", jsonResponse);
}

// Handle POST request to control the motor
void handleMotorControl() {
  if (server.hasArg("plain") == false) {
    server.send(400, "application/json", "{\"error\":\"No data received\"}");
    return;
  }

  // Get the request body
  String body = server.arg("plain");

  // Parse the body to check for motor control command (e.g., "ON" or "OFF")
  if (body.indexOf("ON") >= 0) {
    digitalWrite(MOTORPIN, HIGH);  // Turn on motor
    server.send(200, "application/json", "{\"status\":\"Motor turned ON\"}");
  } else if (body.indexOf("OFF") >= 0) {
    digitalWrite(MOTORPIN, LOW);  // Turn off motor
    server.send(200, "application/json", "{\"status\":\"Motor turned OFF\"}");
  } else {
    server.send(400, "application/json", "{\"error\":\"Invalid command. Use 'ON' or 'OFF'.\"}");
  }
}

void setup() {
  // Start serial communication
  Serial.begin(115200);

  // Initialize DHT sensor
  dht.begin();

  // Initialize motor control pin
  pinMode(MOTORPIN, OUTPUT);
  digitalWrite(MOTORPIN, LOW);  // Initially turn off motor

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Connected to Wi-Fi");
  Serial.print("ESP32 IP address: ");
  Serial.println(WiFi.localIP());

  // Define routes for the web server
  server.on("/", handleRoot);
  server.on("/readings", handleSensorReadings);

  // Define a route to handle motor control via POST
  server.on("/motor", HTTP_POST, handleMotorControl);

  // Start the server
  server.begin();
  Serial.println("Web server started!");
}

void loop() {
  // Handle client requests
  server.handleClient();
}
