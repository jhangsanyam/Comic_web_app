import React, { useState } from "react";
import styles from "./Form.module.css";
import { Panel, PrimaryButton, TextArea } from "..";
import { generator } from "@/handler/form";
import { jsPDF } from "jspdf";
const Initial_Prompts = [""];

const Form = () => {
  const [prompts, setPrompts] = useState(Initial_Prompts);

  const [showPanel, setShowPanel] = useState(false);

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = ( value) => {
   setPrompts(value);
  };
  const download = ( ) => {
    console.log("kl");

      const pdf = new jsPDF('p', 'mm', [326, 131]);
      let xOffset = 1;
      let yOffset = 1;

      for (let i = 0; i < 10; i++) {
          if (i % 2 === 0 && i !== 0) {
              yOffset += 65; // Adjust as needed
              xOffset = 1;
          }
          else if (i !== 0) {
              xOffset = 66;
          }

          const img = new Image();
          img.src = images[i];
          //console.log(generatedImages[i]);

          pdf.addImage(img, 'PNG', xOffset, yOffset, 64, 64);
          //xOffset += 100; // Adjust as needed
      

      pdf.save('comic-panel.pdf');
  };
   };
   const home = ( ) => {
    window.location.reload();
   };
  const handleGenerate = async () => {
    try {
      setLoading(true);
      setShowPanel(true);
      const res = await generator(prompts);
      setImages(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowPanel(false);
    }
  };

  return (
    <>
      {!showPanel && !loading && (
        <div>
          <div className="homeimage">
            <img src="supermenn.webp" height="350"></img>
            <img src="aa.webp" height="350" width="250"></img>
          </div>
        <div className={styles.container}>
          <h2>Dashtoon Comic Strips</h2>
             
              <TextArea
               
                onChange={(e) => {
                  handleChange( e.target.value);
                }}
              />
            
          

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "12px",
              alignSelf: "flex-end",
            }}
          >
            <PrimaryButton
              title="Generate Comic Strips"
              onClick={handleGenerate}
            />
          </div>
        </div>
        </div>
      )}

      {loading && (
        <div className={styles.loader}>
          <img src="/Animation - 1700295279036.gif" />
        </div>
      )}

      {showPanel && !loading && (
        <>
          <img
            className={styles.close}
            src="/cross.svg"
            onClick={() => {
              setShowPanel(false);
            }}
          />
          <Panel images={images} />
          <div className="home">
          <button className="b" onClick={download}>Download</button>
          <button className="b" onClick={home}>Home</button>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
