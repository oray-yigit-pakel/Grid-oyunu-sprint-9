# Gün Projesi:

# Sprint Challenge: Gelişmiş React

## Giriş

Bu challengeda bir oyun geliştireceksiniz.

İşlevini inceleyin ve ayrıca **Chrome Geliştirici Araçları'nda** Konsolu, Ağ sekmesini(Network) ve Öğeler(Elements) sekmelerini inceleyin:

- Sayfanın altındaki input kutusu, geçerli bir e-posta adresi girilmesini bekler.
- Ağ sekmesinde ilgili isteği(request) seçince "Önizleme(Preview)" sekmesinde görebileceğiniz gibi, e-posta doğrulama hataları sunucudan gelir.
- Form gönderiminde sunucuya gönderilen payload, Ağ sekmesinde "Payload" sekmesinden görülebilir
- Özellikle sunucu tarafında bir email kara listeye alınmıştır: `foo@bar.baz`. Bu email gönderildiğinde **"Forbiden" sunucu hatasıyla cevap verir**❗
- Koordinatların orijini Gridin sol üst köşesindedir. (soldan sağa doğru x ekseninde 1,2,3 diye sıralanırlar. yukarıdak aşağıya 1,2,3 diye sıralanırlar. Başlangıç koordinatı 2,2 çünkü soldan 2. yukarıdan 2. kutuda.)

## Gereklilikler

- Uygulama için hazır bir API endpoint'i var: `POST https://nextgen-project.onrender.com/api/s9d5/result`.
- Postman gibi bir HTTP istemcisi kullanarak bu uç noktayı deneyebilirsin.
- Uç nokta şu şekilde bir payloada gereksinim duyuyor: `{ "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }`:
  - `x` 1 ile 3 arasında bir integer olmalı.
  - `y` 1 ile 3 arasında bir integer olmalı.
  - `steps` 0 dan büyük bir integer olmalı.
  - `email` geçerli bir email adresi olmalı.
- Eğer payload hatalı gönderilirse bir "Unprocessable Entity"(İşlenemez Varlık) sunucu cevabı döner.

## MVP

### MVP 1, Grid

- Kodlarınızı `src/components/GridGame.jsx` dosyasına yazın.
- "GridGame.jsx" tarafından sunulan bileşen, stateful olan işlevsel bir bileşen olmalıdır.
- Bileşenleriniz tarafından üretilen DOM, prototipteki DOM ile tam olarak eşleşmelidir:
  - HTML öğelerinin hiyerarşisi, idleri, class adları vb. aynı olmalıdır..
  - Geçerli kare, büyük bir B ve "active" class adıyla işaretlenmiştir.
  - Sayfada görüntülenen submit başarısı ve hata mesajları API'den gelir.(Network tabını inceleyin).
  - Frontend form doğrulama eklemenize gerek yok.
- Gridin her bir karesinin koordinatları aşağıdaki gibidir:

  ```js
    (1, 1) (2, 1) (3, 1)
    (1, 2) (2, 2) (3, 2)
    (1, 3) (2, 3) (3, 3)
  ```

❗ TÜM TESTLER GEÇMELİ

### MVP 2, Test

- `src/__tests__/index.test.jsx` den ilham alarak `src/components/GridGame.test.jsx` içine 5 tane test kodu yazın:
  - Test dosyanızın içine `GridGame.jsx` bileşenini import edin.
  - Başlıklardaki, butonlardaki, bağlantılardaki görünür metinlerin ekranda göründüğünü test edin.
  - Inputa metin girildiğinde value değişimini test eden bir test yazın.

### Gridle ilgili diğer notlar:

- `GridGame` içinde bazı önerilen stateler ve yardımcı fonksiyonlar bulacaksınız. Bunları kullanmaktan çekinmeyin.
- Karelerin durumunu izlemek için karmaşık bir yapıya ihtiyacınız yok çünkü karelerde herhangi bir bilgi depolamıyoruz.
- Gridin --yalnızca görsel olarak- üç sıraya bölünmüş tek boyutlu bir dizi olduğunu hayal edin..
- Gridi sürmek için ihtiyaç duyduğunuz tek bileşen statei, 0 ile 8 arasında bir tamsayıdır: **"B" nin indexi şu satırda.**
- Koordinatlar gibi diğer bilgi parçaları bu dizinden türetilebilir ve kendi statelerine ihtiyaç duymazlar.
- Hayatı kendiniz için daha karmaşık (veya ilginç) hale getirmek istiyorsanız, gridin stateini saklamak için başka yapılar kullanılabilir:

  ```js
  // Bir gridi temsil etmek için düz bir dizi kullanılabilir.
  // Ancak Uygulama bileşenimizin tüm diziyi izlemesi gerekmez, yalnızca "B"nin olduğu dizini izlemesi gerekir.
  [null, null, null, null, "B", null, null, null, null]

  // Bir gridi temsil etmek için 2 boyutlu diziler veya matrisler kullanılabilir, ancak bu, bu projede önerilmez:
  [[null, null, null], [null, "B", null], [null, null, null]]

  // Bir string de işe yarayabilir, ancak JS'deki stringler değişmezdir ve bu yaklaşımı elverişsiz hale getirir:
  "xxxxBxxxx"
  ```
