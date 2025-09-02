import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about-container">
      <h2>Hakkımızda</h2>
      <p>
        Biz, bilgi paylaşmanın gücüne inanan tutkulu bir ekip olarak yola
        çıktık. Amacımız; teknolojiden sanata, sağlıktan gündelik yaşama kadar
        her konuda ilham verici ve faydalı içerikler sunmak.
      </p>
      <p>
        Blogumuzda; <br />
        - Güncel gelişmeleri, <br />
        - İlham verici hikayeleri, <br />
        - Deneyim ve tavsiyelerimizi <br />
        samimi bir dille sizlerle paylaşıyoruz.
      </p>
      <p>
        Burada sadece yazı yok; bir topluluk var! Yorumlarınız ve geri
        bildirimlerinizle blogumuzu hep birlikte daha zengin ve faydalı bir hale
        getiriyoruz.
      </p>
      <p>
        Siz de bu yolculuğun bir parçası olun, çünkü{" "}
        <strong>paylaştıkça çoğalıyoruz.</strong>
      </p>
    </div>
  );
}

export default About;
