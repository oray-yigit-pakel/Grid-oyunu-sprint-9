import React from 'react';
import axios from 'axios';
// useForm: form verilerini kontrol etmek için, useWatch: form değerlerini canlı izlemek için
import { useForm, useWatch } from 'react-hook-form';

export default function GridGame(props) {
  // useForm ile tüm form kontrol değerlerini tanımlıyoruz
  // İlk başta senin kullandığın useState'leri kaldırdım ve bunları form içinde tanımladım
  const {
    register,         // inputları bağlamak için
    handleSubmit,     // form submit işlemini sarmalamak için
    setValue,         // form verilerini güncellemek için
    getValues,        // anlık form verilerini almak için
    reset,            // formu resetlemek için
    control           // useWatch için gerekli
  } = useForm({
    defaultValues: {
      email: '',       // email inputu için başlangıç
      index: 4,        // "B" harfinin bulunduğu başlangıç index'i (orta)
      steps: 0,        // başlangıçta 0 adım atıldı
      message: '',     // başlangıçta mesaj boş
    },
  });

  // Bu satırlarla formun içindeki değerleri izliyoruz (state yerine geçer)
  const index = useWatch({ control, name: 'index' });
  const steps = useWatch({ control, name: 'steps' });
  const message = useWatch({ control, name: 'message' });

  // "B" harfinin bulunduğu index'e göre (x,y) koordinatlarını hesaplayan helper fonksiyon
  const getXY = () => {
    const x = (index % 3) + 1;               // sütun (soldan sağa)
    const y = Math.floor(index / 3) + 1;     // satır (yukarıdan aşağıya)
    return { x, y };
  };

  // Kullanıcıya gösterilecek olan "Koordinatlar (x, y)" mesajını döndürür
  const getXYMesaj = () => {
    const { x, y } = getXY();
    return `Koordinatlar (${x}, ${y})`;
  };

  // Oyunu resetlemek için (email, index, steps, message sıfırlanır)
  const resetGame = () => {
    reset({ email: '', index: 4, steps: 0, message: '' });
  };

  // Yön bilgisini alır, geçerli index'e göre yeni index'i hesaplar
  const sonrakiIndex = (yon) => {
    const satir = Math.floor(index / 3);
    const sutun = index % 3;

    switch (yon) {
      case 'sol':
        return sutun === 0 ? index : index - 1;     // sola gidebiliyorsa
      case 'sag':
        return sutun === 2 ? index : index + 1;     // sağa gidebiliyorsa
      case 'yukari':
        return satir === 0 ? index : index - 3;     // yukarı gidebiliyorsa
      case 'asagi':
        return satir === 2 ? index : index + 3;     // aşağı gidebiliyorsa
      default:
        return index;
    }
  };

  // Kullanıcı yön tuşuna bastığında çalışır
  const handleMove = (yon) => {
    const yeniIndex = sonrakiIndex(yon);
    if (yeniIndex === index) {
      setValue('message', 'O yöne gidemezsiniz');    // hareket edemezse uyarı
    } else {
      setValue('index', yeniIndex);                 // yeni index'e geç
      setValue('steps', steps + 1);                 // adım sayısını artır
      setValue('message', '');                      // mesajı temizle
    }
  };

  // Form gönderimi yapıldığında çağrılır
  const onSubmit = async (data) => {
    const { x, y } = getXY();                       // güncel koordinatları al

    try {
      // API'ye isteği gönderiyoruz
      const res = await axios.post('https://nextgen-project.onrender.com/api/s9d5/result', {
        x,
        y,
        steps: data.steps,
        email: data.email,
      });
      setValue('message', res.data.message);        // API'den gelen mesajı göster
    } catch (err) {
      // Hata varsa mesaj olarak göster
      setValue('message', err.response?.data?.message || 'Hata oluştu');
    }

    setValue('email', '');                          // inputu temizle
  };

  return (
    <div id="wrapper" className={props.className}>
      {/* Koordinatlar ve adım sayısı */}
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>

      {/* Grid yapısı */}
      <div id="grid">
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>

      {/* API'den dönen mesaj */}
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>

      {/* Yön tuşları */}
      <div id="keypad">
        <button id="sol" onClick={() => handleMove('sol')}>SOL</button>
        <button id="yukari" onClick={() => handleMove('yukari')}>YUKARI</button>
        <button id="sag" onClick={() => handleMove('sag')}>SAĞ</button>
        <button id="asagi" onClick={() => handleMove('asagi')}>AŞAĞI</button>
        <button id="reset" onClick={resetGame}>reset</button>
      </div>

      {/* Email formu */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          {...register('email', { required: true })} // react-hook-form bağlantısı
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
