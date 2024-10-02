import streamlit as st
from ultralytics import YOLO
from PIL import Image
import cv2
import numpy as np
import io

def load_model():
    return YOLO('final_model.pt')  # Update this path to your YOLO model

def process_image(image, model):
    # Convert PIL Image to numpy array
    image_np = np.array(image)

    # Run inference
    results = model(image_np)

    # Process results
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy()
        classes = result.boxes.cls.cpu().numpy()
        confidences = result.boxes.conf.cpu().numpy()

        # Draw bounding boxes on the image
        for box, cls, conf in zip(boxes, classes, confidences):
            x1, y1, x2, y2 = box.astype(int)
            label = f"{model.names[int(cls)]} {conf:.2f}"
            cv2.rectangle(image_np, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(image_np, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    return Image.fromarray(image_np)

def main():
    st.set_page_config(page_title="Weed Detection App", layout="centered")

    # Styling with CSS, including background image
    st.markdown("""
    <style>
        body {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: #FFFFDA;
        }
        .main {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        h1 {
            color: #4CAF50;
            font-weight: bold;
            text-align: center;
        }
        .stButton>button {
            background-color: #4CAF50;
            color: white;
            padding: 15px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .stButton>button:hover {
            background-color: #45a049;
        }
        footer {
            text-align: center;
            color: black;
            padding: 10px;
            margin-top: 20px;
        }
    </style>
    """, unsafe_allow_html=True)

    st.title("🌿 Weed Detection App 🌿")
    
    # Load model
    model = load_model()

    # File uploader
    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

    if uploaded_file is not None:
        # Display original image
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded Image", use_column_width=True)

        # Process image button
        if st.button("🔍 Detect Weeds"):
            with st.spinner("Processing..."):
                # Process the image
                result_image = process_image(image, model)

                # Display result
                st.image(result_image, caption="Detection Result", use_column_width=True)

                # Provide download option
                buf = io.BytesIO()
                result_image.save(buf, format="PNG")
                btn = st.download_button(
                    label="⬇️ Download Result",
                    data=buf.getvalue(),
                    file_name="weed_detection_result.png",
                    mime="image/png"
                )

    # Footer
    st.markdown("""
        <footer>
            <p>© 2024 Crop Core Tech</p>
        </footer>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
