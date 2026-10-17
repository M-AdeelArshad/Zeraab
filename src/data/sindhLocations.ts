export interface SindhLocationItem {
  id: string;
  name: string;
  nameUrdu?: string;
  type: 'District' | 'Taluka' | 'Town' | 'City' | 'Landmark' | 'Neighborhood';
  district: string;
  division: string;
  lat: number;
  lon: number;
}

// Comprehensive database of Sindh administrative divisions, talukas, towns, and major landmarks
export const SINDH_CURATED_LOCATIONS: SindhLocationItem[] = [
  // --- KARACHI DIVISION ---
  // Karachi South
  { id: 'khi-saddar', name: 'Saddar', nameUrdu: 'صدر', type: 'Taluka', district: 'Karachi South', division: 'Karachi', lat: 24.8569, lon: 67.0142 },
  { id: 'khi-clifton', name: 'Clifton', nameUrdu: 'کلفٹن', type: 'Neighborhood', district: 'Karachi South', division: 'Karachi', lat: 24.8191, lon: 67.0262 },
  { id: 'khi-dha', name: 'Defence (DHA)', nameUrdu: 'ڈی ایچ اے', type: 'Neighborhood', district: 'Karachi South', division: 'Karachi', lat: 24.8016, lon: 67.0544 },
  { id: 'khi-lyari', name: 'Lyari', nameUrdu: 'لیاری', type: 'Taluka', district: 'Karachi South', division: 'Karachi', lat: 24.8694, lon: 66.9946 },
  { id: 'khi-garden', name: 'Garden', nameUrdu: 'گارڈن', type: 'Neighborhood', district: 'Karachi South', division: 'Karachi', lat: 24.8763, lon: 67.0177 },
  { id: 'khi-civil-lines', name: 'Civil Lines', nameUrdu: 'سول لائنز', type: 'Neighborhood', district: 'Karachi South', division: 'Karachi', lat: 24.8465, lon: 67.0253 },
  { id: 'khi-arambagh', name: 'Aram Bagh', nameUrdu: 'آرام باغ', type: 'Neighborhood', district: 'Karachi South', division: 'Karachi', lat: 24.8541, lon: 67.0108 },

  // Karachi East
  { id: 'khi-gulshan', name: 'Gulshan-e-Iqbal', nameUrdu: 'گلشن اقبال', type: 'Taluka', district: 'Karachi East', division: 'Karachi', lat: 24.9180, lon: 67.0971 },
  { id: 'khi-ferozabad', name: 'Ferozabad (PECHS)', nameUrdu: 'فیروز آباد', type: 'Taluka', district: 'Karachi East', division: 'Karachi', lat: 24.8722, lon: 67.0628 },
  { id: 'khi-jamshed', name: 'Jamshed Quarters', nameUrdu: 'جمشید کوارٹرز', type: 'Taluka', district: 'Karachi East', division: 'Karachi', lat: 24.8812, lon: 67.0396 },
  { id: 'khi-gulzar-hijri', name: 'Gulzar-e-Hijri (Scheme 33)', nameUrdu: 'گلزار ہجری', type: 'Taluka', district: 'Karachi East', division: 'Karachi', lat: 24.9620, lon: 67.1260 },
  { id: 'khi-bahria-town', name: 'Bahria Town Karachi', nameUrdu: 'بحریہ ٹاؤن کراچی', type: 'Neighborhood', district: 'Malir', division: 'Karachi', lat: 25.0210, lon: 67.3320 },

  // Karachi Central
  { id: 'khi-north-nazimabad', name: 'North Nazimabad', nameUrdu: 'شمالی ناظم آباد', type: 'Taluka', district: 'Karachi Central', division: 'Karachi', lat: 24.9388, lon: 67.0427 },
  { id: 'khi-nazimabad', name: 'Nazimabad', nameUrdu: 'ناظم آباد', type: 'Taluka', district: 'Karachi Central', division: 'Karachi', lat: 24.9125, lon: 67.0317 },
  { id: 'khi-liaquatabad', name: 'Liaquatabad', nameUrdu: 'لیاقت آباد', type: 'Taluka', district: 'Karachi Central', division: 'Karachi', lat: 24.9080, lon: 67.0440 },
  { id: 'khi-new-karachi', name: 'New Karachi', nameUrdu: 'نیو کراچی', type: 'Taluka', district: 'Karachi Central', division: 'Karachi', lat: 24.9920, lon: 67.0650 },
  { id: 'khi-gulberg', name: 'Gulberg Karachi', nameUrdu: 'گلبرگ کراچی', type: 'Taluka', district: 'Karachi Central', division: 'Karachi', lat: 24.9450, lon: 67.0720 },

  // Karachi West & Keamari
  { id: 'khi-orangi', name: 'Orangi Town', nameUrdu: 'اورنگی ٹاؤن', type: 'Taluka', district: 'Karachi West', division: 'Karachi', lat: 24.9490, lon: 66.9980 },
  { id: 'khi-manghopir', name: 'Manghopir', nameUrdu: 'منگھوپیر', type: 'Taluka', district: 'Karachi West', division: 'Karachi', lat: 25.0180, lon: 67.0320 },
  { id: 'khi-mominabad', name: 'Mominabad', nameUrdu: 'مومن آباد', type: 'Taluka', district: 'Karachi West', division: 'Karachi', lat: 24.9410, lon: 66.9780 },
  { id: 'khi-keamari', name: 'Keamari', nameUrdu: 'کیماڑی', type: 'Taluka', district: 'Keamari', division: 'Karachi', lat: 24.8190, lon: 66.9780 },
  { id: 'khi-baldia', name: 'Baldia Town', nameUrdu: 'بلدیہ ٹاؤن', type: 'Taluka', district: 'Keamari', division: 'Karachi', lat: 24.9140, lon: 66.9660 },
  { id: 'khi-mauripur', name: 'Mauripur / Hawkesbay', nameUrdu: 'ماڑی پور', type: 'Taluka', district: 'Keamari', division: 'Karachi', lat: 24.8620, lon: 66.9120 },
  { id: 'khi-site', name: 'S.I.T.E. Area', nameUrdu: 'سائٹ ایریا', type: 'Neighborhood', district: 'Keamari', division: 'Karachi', lat: 24.8960, lon: 67.0010 },

  // Korangi & Malir
  { id: 'khi-korangi', name: 'Korangi', nameUrdu: 'کورنگی', type: 'Taluka', district: 'Korangi', division: 'Karachi', lat: 24.8350, lon: 67.1280 },
  { id: 'khi-landhi', name: 'Landhi', nameUrdu: 'لانڈھی', type: 'Taluka', district: 'Korangi', division: 'Karachi', lat: 24.8480, lon: 67.1850 },
  { id: 'khi-shah-faisal', name: 'Shah Faisal Town', nameUrdu: 'شاہ فیصل ٹاؤن', type: 'Taluka', district: 'Korangi', division: 'Karachi', lat: 24.8820, lon: 67.1510 },
  { id: 'khi-model-colony', name: 'Model Colony', nameUrdu: 'ماڈل کالونی', type: 'Neighborhood', district: 'Korangi', division: 'Karachi', lat: 24.9010, lon: 67.1820 },
  { id: 'khi-bin-qasim', name: 'Bin Qasim (Port Qasim)', nameUrdu: 'بن قاسم', type: 'Taluka', district: 'Malir', division: 'Karachi', lat: 24.7930, lon: 67.3320 },
  { id: 'khi-gadup', name: 'Gadap', nameUrdu: 'گڈاپ', type: 'Taluka', district: 'Malir', division: 'Karachi', lat: 25.1430, lon: 67.1940 },
  { id: 'khi-malir-cantt', name: 'Malir Cantonment', nameUrdu: 'ملیر کینٹ', type: 'Neighborhood', district: 'Malir', division: 'Karachi', lat: 24.9350, lon: 67.1980 },
  { id: 'khi-ibrahim-hyderi', name: 'Ibrahim Hyderi', nameUrdu: 'ابراہیم حیدری', type: 'Town', district: 'Malir', division: 'Karachi', lat: 24.7920, lon: 67.1350 },

  // --- HYDERABAD DIVISION ---
  // Hyderabad District
  { id: 'hyd-city', name: 'Hyderabad City', nameUrdu: 'حیدرآباد سٹی', type: 'City', district: 'Hyderabad', division: 'Hyderabad', lat: 25.3960, lon: 68.3578 },
  { id: 'hyd-latifabad', name: 'Latifabad', nameUrdu: 'لطیف آباد', type: 'Taluka', district: 'Hyderabad', division: 'Hyderabad', lat: 25.3670, lon: 68.3500 },
  { id: 'hyd-qasimabad', name: 'Qasimabad', nameUrdu: 'قاسم آباد', type: 'Taluka', district: 'Hyderabad', division: 'Hyderabad', lat: 25.4050, lon: 68.3320 },
  { id: 'hyd-rural', name: 'Hyderabad Rural', nameUrdu: 'حیدرآباد دیہی', type: 'Taluka', district: 'Hyderabad', division: 'Hyderabad', lat: 25.4380, lon: 68.4230 },

  // Jamshoro
  { id: 'jam-kotri', name: 'Kotri', nameUrdu: 'کوٹری', type: 'Taluka', district: 'Jamshoro', division: 'Hyderabad', lat: 25.3678, lon: 68.3121 },
  { id: 'jam-sehwan', name: 'Sehwan Sharif', nameUrdu: 'سیہون شریف', type: 'Taluka', district: 'Jamshoro', division: 'Hyderabad', lat: 26.4268, lon: 67.8638 },
  { id: 'jam-manjhand', name: 'Manjhand', nameUrdu: 'مانجھند', type: 'Taluka', district: 'Jamshoro', division: 'Hyderabad', lat: 25.9180, lon: 68.2340 },
  { id: 'jam-thano-bula-khan', name: 'Thano Bula Khan', nameUrdu: 'تھانو بولا خان', type: 'Taluka', district: 'Jamshoro', division: 'Hyderabad', lat: 25.3660, lon: 67.8340 },
  { id: 'jam-jamshoro-uni', name: 'Jamshoro University City', nameUrdu: 'جامشورو', type: 'Town', district: 'Jamshoro', division: 'Hyderabad', lat: 25.4310, lon: 68.2810 },
  { id: 'jam-manchar-lake', name: 'Manchar Lake', nameUrdu: 'منچھر جھیل', type: 'Landmark', district: 'Jamshoro', division: 'Hyderabad', lat: 26.4350, lon: 67.6520 },

  // Dadu
  { id: 'dadu-city', name: 'Dadu City', nameUrdu: 'دادو', type: 'City', district: 'Dadu', division: 'Hyderabad', lat: 26.7329, lon: 67.7763 },
  { id: 'dadu-mehar', name: 'Mehar', nameUrdu: 'میہڑ', type: 'Taluka', district: 'Dadu', division: 'Hyderabad', lat: 27.1812, lon: 67.8225 },
  { id: 'dadu-kn-shah', name: 'Khairpur Nathan Shah', nameUrdu: 'خیرپور ناتھن شاہ', type: 'Taluka', district: 'Dadu', division: 'Hyderabad', lat: 27.0910, lon: 67.7340 },
  { id: 'dadu-johi', name: 'Johi', nameUrdu: 'جوہی', type: 'Taluka', district: 'Dadu', division: 'Hyderabad', lat: 26.6910, lon: 67.6150 },
  { id: 'dadu-gorakh-hill', name: 'Gorakh Hill Station', nameUrdu: 'گورکھ ہل اسٹیشن', type: 'Landmark', district: 'Dadu', division: 'Hyderabad', lat: 26.8680, lon: 67.1520 },

  // Matiari
  { id: 'mat-city', name: 'Matiari', nameUrdu: 'مٹیاری', type: 'Taluka', district: 'Matiari', division: 'Hyderabad', lat: 25.5971, lon: 68.4467 },
  { id: 'mat-hala', name: 'Hala', nameUrdu: 'ہالا', type: 'Taluka', district: 'Matiari', division: 'Hyderabad', lat: 25.8115, lon: 68.4219 },
  { id: 'mat-saeedabad', name: 'New Saeedabad', nameUrdu: 'نیو سعید آباد', type: 'Taluka', district: 'Matiari', division: 'Hyderabad', lat: 26.0120, lon: 68.4150 },
  { id: 'mat-bhit-shah', name: 'Bhit Shah', nameUrdu: 'بھٹ شاہ', type: 'Town', district: 'Matiari', division: 'Hyderabad', lat: 25.8050, lon: 68.4920 },

  // Tando Allahyar & Tando Muhammad Khan
  { id: 'tando-allahyar', name: 'Tando Allahyar', nameUrdu: 'ٹنڈو الہ یار', type: 'City', district: 'Tando Allahyar', division: 'Hyderabad', lat: 25.4606, lon: 68.7174 },
  { id: 'tando-chamber', name: 'Chamber', nameUrdu: 'چمبڑ', type: 'Taluka', district: 'Tando Allahyar', division: 'Hyderabad', lat: 25.2970, lon: 68.8150 },
  { id: 'tando-jhando-mari', name: 'Jhando Mari', nameUrdu: 'جھنڈو مری', type: 'Taluka', district: 'Tando Allahyar', division: 'Hyderabad', lat: 25.5910, lon: 68.8020 },
  { id: 'tando-tmk', name: 'Tando Muhammad Khan', nameUrdu: 'ٹنڈو محمد خان', type: 'City', district: 'Tando Muhammad Khan', division: 'Hyderabad', lat: 25.1239, lon: 68.5369 },
  { id: 'tando-bulri', name: 'Bulri Shah Karim', nameUrdu: 'بلڑی شاہ کریم', type: 'Taluka', district: 'Tando Muhammad Khan', division: 'Hyderabad', lat: 25.0320, lon: 68.3980 },
  { id: 'tando-ghulam-hyder', name: 'Tando Ghulam Hyder', nameUrdu: 'ٹنڈو غلام حیدر', type: 'Taluka', district: 'Tando Muhammad Khan', division: 'Hyderabad', lat: 25.1120, lon: 68.7180 },

  // Badin
  { id: 'badin-city', name: 'Badin City', nameUrdu: 'بدین', type: 'City', district: 'Badin', division: 'Hyderabad', lat: 24.6558, lon: 68.8384 },
  { id: 'badin-matli', name: 'Matli', nameUrdu: 'ماتلی', type: 'Taluka', district: 'Badin', division: 'Hyderabad', lat: 25.0420, lon: 68.6560 },
  { id: 'badin-tando-bago', name: 'Tando Bago', nameUrdu: 'ٹنڈو باگو', type: 'Taluka', district: 'Badin', division: 'Hyderabad', lat: 24.7890, lon: 68.9660 },
  { id: 'badin-talhar', name: 'Talhar', nameUrdu: 'تلہار', type: 'Taluka', district: 'Badin', division: 'Hyderabad', lat: 24.8850, lon: 68.8150 },
  { id: 'badin-golarchi', name: 'Golarchi (Shaheed Fazil Rahu)', nameUrdu: 'گولارچی', type: 'Taluka', district: 'Badin', division: 'Hyderabad', lat: 24.6210, lon: 68.5140 },

  // Thatta & Sujawal
  { id: 'thatta-city', name: 'Thatta City', nameUrdu: 'ٹھٹہ', type: 'City', district: 'Thatta', division: 'Hyderabad', lat: 24.7474, lon: 67.9239 },
  { id: 'thatta-makli', name: 'Makli Necropolis', nameUrdu: 'مکلی', type: 'Landmark', district: 'Thatta', division: 'Hyderabad', lat: 24.7550, lon: 67.9010 },
  { id: 'thatta-keenjhar', name: 'Keenjhar Lake (Kalri Lake)', nameUrdu: 'کینجھر جھیل', type: 'Landmark', district: 'Thatta', division: 'Hyderabad', lat: 24.9450, lon: 68.0480 },
  { id: 'thatta-mirpur-sakro', name: 'Mirpur Sakro', nameUrdu: 'میرپور ساکرو', type: 'Taluka', district: 'Thatta', division: 'Hyderabad', lat: 24.5490, lon: 67.6280 },
  { id: 'thatta-ghorabari', name: 'Ghorabari', nameUrdu: 'گھوڑا باری', type: 'Taluka', district: 'Thatta', division: 'Hyderabad', lat: 24.3120, lon: 67.7560 },
  { id: 'thatta-keti-bandar', name: 'Keti Bandar', nameUrdu: 'کیٹی بندر', type: 'Taluka', district: 'Thatta', division: 'Hyderabad', lat: 24.1450, lon: 67.4520 },
  { id: 'sujawal-city', name: 'Sujawal City', nameUrdu: 'سجاول', type: 'City', district: 'Sujawal', division: 'Hyderabad', lat: 24.6044, lon: 68.0778 },
  { id: 'sujawal-jati', name: 'Jati', nameUrdu: 'جاتی', type: 'Taluka', district: 'Sujawal', division: 'Hyderabad', lat: 24.3540, lon: 68.2610 },
  { id: 'sujawal-mirpur-bathoro', name: 'Mirpur Bathoro', nameUrdu: 'میرپور بٹھورو', type: 'Taluka', district: 'Sujawal', division: 'Hyderabad', lat: 24.7320, lon: 68.2560 },
  { id: 'sujawal-shah-bandar', name: 'Shah Bandar', nameUrdu: 'شاہ بندر', type: 'Taluka', district: 'Sujawal', division: 'Hyderabad', lat: 24.1670, lon: 67.9050 },

  // --- SUKKUR DIVISION ---
  // Sukkur District
  { id: 'sukkur-city', name: 'Sukkur City', nameUrdu: 'سکھر', type: 'City', district: 'Sukkur', division: 'Sukkur', lat: 27.7052, lon: 68.8574 },
  { id: 'sukkur-rohri', name: 'Rohri', nameUrdu: 'روہڑی', type: 'Taluka', district: 'Sukkur', division: 'Sukkur', lat: 27.6744, lon: 68.8970 },
  { id: 'sukkur-pano-akil', name: 'Pano Akil', nameUrdu: 'پنو عاقل', type: 'Taluka', district: 'Sukkur', division: 'Sukkur', lat: 27.8570, lon: 69.1120 },
  { id: 'sukkur-salehpat', name: 'Salehpat', nameUrdu: 'صالح پٹ', type: 'Taluka', district: 'Sukkur', division: 'Sukkur', lat: 27.6250, lon: 69.2150 },
  { id: 'sukkur-barrage', name: 'Sukkur Barrage', nameUrdu: 'سکھر بیراج', type: 'Landmark', district: 'Sukkur', division: 'Sukkur', lat: 27.6970, lon: 68.8470 },

  // Ghotki
  { id: 'ghotki-city', name: 'Ghotki City', nameUrdu: 'گھوٹکی', type: 'City', district: 'Ghotki', division: 'Sukkur', lat: 28.0060, lon: 69.3161 },
  { id: 'ghotki-mirpur-mathelo', name: 'Mirpur Mathelo', nameUrdu: 'میرپور ماتھیلو', type: 'Taluka', district: 'Ghotki', division: 'Sukkur', lat: 28.0210, lon: 69.5490 },
  { id: 'ghotki-daharki', name: 'Daharki', nameUrdu: 'ڈہرکی', type: 'Taluka', district: 'Ghotki', division: 'Sukkur', lat: 28.0490, lon: 69.6840 },
  { id: 'ghotki-ubauro', name: 'Ubauro', nameUrdu: 'اوباڑو', type: 'Taluka', district: 'Ghotki', division: 'Sukkur', lat: 28.1670, lon: 69.7320 },
  { id: 'ghotki-khangarh', name: 'Khangarh (Khanpur Mahar)', nameUrdu: 'خان پور مہر', type: 'Taluka', district: 'Ghotki', division: 'Sukkur', lat: 27.8420, lon: 69.4120 },

  // Khairpur
  { id: 'khp-city', name: 'Khairpur City', nameUrdu: 'خیرپور', type: 'City', district: 'Khairpur', division: 'Sukkur', lat: 27.5295, lon: 68.7592 },
  { id: 'khp-gambat', name: 'Gambat', nameUrdu: 'گمبٹ', type: 'Taluka', district: 'Khairpur', division: 'Sukkur', lat: 27.3550, lon: 68.5210 },
  { id: 'khp-ranipur', name: 'Ranipur', nameUrdu: 'رانی پور', type: 'Town', district: 'Khairpur', division: 'Sukkur', lat: 27.2870, lon: 68.5044 },
  { id: 'khp-kot-diji', name: 'Kot Diji (Fort)', nameUrdu: 'کوٹ ڈیجی', type: 'Taluka', district: 'Khairpur', division: 'Sukkur', lat: 27.3410, lon: 68.7120 },
  { id: 'khp-kingri', name: 'Kingri (Pir Jo Goth)', nameUrdu: 'کنگری', type: 'Taluka', district: 'Khairpur', division: 'Sukkur', lat: 27.6120, lon: 68.6150 },
  { id: 'khp-sobhodero', name: 'Sobhodero', nameUrdu: 'صوبھو دیرو', type: 'Taluka', district: 'Khairpur', division: 'Sukkur', lat: 27.3010, lon: 68.4230 },
  { id: 'khp-faiz-ganj', name: 'Faiz Ganj (Pacca Chang)', nameUrdu: 'فیض گنج', type: 'Taluka', district: 'Khairpur', division: 'Sukkur', lat: 26.9850, lon: 68.4890 },
  { id: 'khp-nara', name: 'Nara', nameUrdu: 'نارا', type: 'Taluka', district: 'Khairpur', division: 'Sukkur', lat: 26.8520, lon: 69.1120 },
  { id: 'khp-thari-mirwah', name: 'Thari Mirwah', nameUrdu: 'ٹھری میرواہ', type: 'Taluka', district: 'Khairpur', division: 'Sukkur', lat: 27.1890, lon: 68.6180 },

  // --- LARKANA DIVISION ---
  // Larkana District
  { id: 'lrk-city', name: 'Larkana City', nameUrdu: 'لاڑکانہ', type: 'City', district: 'Larkana', division: 'Larkana', lat: 27.5590, lon: 68.2120 },
  { id: 'lrk-ratodero', name: 'Ratodero', nameUrdu: 'رتودیرو', type: 'Taluka', district: 'Larkana', division: 'Larkana', lat: 27.8020, lon: 68.2890 },
  { id: 'lrk-dokri', name: 'Dokri', nameUrdu: 'ڈوکری', type: 'Taluka', district: 'Larkana', division: 'Larkana', lat: 27.3750, lon: 68.0980 },
  { id: 'lrk-bakrani', name: 'Bakrani', nameUrdu: 'بقرانی', type: 'Taluka', district: 'Larkana', division: 'Larkana', lat: 27.4410, lon: 68.2340 },
  { id: 'lrk-mohenjo-daro', name: 'Mohenjo-daro (UNESCO Site)', nameUrdu: 'موئن جو دڑو', type: 'Landmark', district: 'Larkana', division: 'Larkana', lat: 27.3292, lon: 68.1386 },

  // Qambar Shahdadkot
  { id: 'qmb-qambar', name: 'Qambar', nameUrdu: 'قمبر', type: 'Taluka', district: 'Qambar Shahdadkot', division: 'Larkana', lat: 27.5878, lon: 68.0019 },
  { id: 'qmb-shahdadkot', name: 'Shahdadkot', nameUrdu: 'شہداد کوٹ', type: 'Taluka', district: 'Qambar Shahdadkot', division: 'Larkana', lat: 27.8470, lon: 67.9050 },
  { id: 'qmb-warah', name: 'Warah', nameUrdu: 'وارہ', type: 'Taluka', district: 'Qambar Shahdadkot', division: 'Larkana', lat: 27.4480, lon: 67.7950 },
  { id: 'qmb-mirokhan', name: 'Mirokhan', nameUrdu: 'میروخان', type: 'Taluka', district: 'Qambar Shahdadkot', division: 'Larkana', lat: 27.7610, lon: 68.0950 },
  { id: 'qmb-nasirabad', name: 'Nasirabad', nameUrdu: 'نصیر آباد', type: 'Taluka', district: 'Qambar Shahdadkot', division: 'Larkana', lat: 27.3820, lon: 67.9150 },
  { id: 'qmb-qubo', name: 'Qubo Saeed Khan', nameUrdu: 'قبو سعید خان', type: 'Taluka', district: 'Qambar Shahdadkot', division: 'Larkana', lat: 27.9120, lon: 67.6250 },

  // Shikarpur
  { id: 'shp-city', name: 'Shikarpur City', nameUrdu: 'شکارپور', type: 'City', district: 'Shikarpur', division: 'Larkana', lat: 27.9570, lon: 68.6380 },
  { id: 'shp-khanpur', name: 'Khanpur', nameUrdu: 'خان پور', type: 'Taluka', district: 'Shikarpur', division: 'Larkana', lat: 28.0210, lon: 68.7120 },
  { id: 'shp-garhi-yasin', name: 'Garhi Yasin', nameUrdu: 'گڑھی یاسین', type: 'Taluka', district: 'Shikarpur', division: 'Larkana', lat: 27.9050, lon: 68.5120 },
  { id: 'shp-lakhi', name: 'Lakhi Ghulam Shah', nameUrdu: 'لکھی غلام شاہ', type: 'Taluka', district: 'Shikarpur', division: 'Larkana', lat: 27.8520, lon: 68.6980 },

  // Jacobabad & Kashmore
  { id: 'jac-city', name: 'Jacobabad City', nameUrdu: 'جیکب آباد', type: 'City', district: 'Jacobabad', division: 'Larkana', lat: 28.2835, lon: 68.4387 },
  { id: 'jac-thul', name: 'Thul', nameUrdu: 'ٹھل', type: 'Taluka', district: 'Jacobabad', division: 'Larkana', lat: 28.2410, lon: 68.7750 },
  { id: 'jac-garhi-khairo', name: 'Garhi Khairo', nameUrdu: 'گڑھی خیرو', type: 'Taluka', district: 'Jacobabad', division: 'Larkana', lat: 28.0620, lon: 68.1850 },
  { id: 'ksh-kashmore', name: 'Kashmore City', nameUrdu: 'کشمور', type: 'City', district: 'Kashmore', division: 'Larkana', lat: 28.4332, lon: 69.5836 },
  { id: 'ksh-kandhkot', name: 'Kandhkot', nameUrdu: 'کندھ کوٹ', type: 'Taluka', district: 'Kashmore', division: 'Larkana', lat: 28.2440, lon: 69.1820 },
  { id: 'ksh-tangwani', name: 'Tangwani', nameUrdu: 'تنگوانی', type: 'Taluka', district: 'Kashmore', division: 'Larkana', lat: 28.2890, lon: 68.9950 },

  // --- SHAHEED BENAZIRABAD DIVISION ---
  // Shaheed Benazirabad (Nawabshah)
  { id: 'sba-nawabshah', name: 'Nawabshah City', nameUrdu: 'نواب شاہ', type: 'City', district: 'Shaheed Benazirabad', division: 'Shaheed Benazirabad', lat: 26.2483, lon: 68.4096 },
  { id: 'sba-sakrand', name: 'Sakrand', nameUrdu: 'سکرنڈ', type: 'Taluka', district: 'Shaheed Benazirabad', division: 'Shaheed Benazirabad', lat: 26.1380, lon: 68.2750 },
  { id: 'sba-daur', name: 'Daur', nameUrdu: 'ڈور', type: 'Taluka', district: 'Shaheed Benazirabad', division: 'Shaheed Benazirabad', lat: 26.4520, lon: 68.3150 },
  { id: 'sba-qazi-ahmed', name: 'Qazi Ahmed', nameUrdu: 'قاضی احمد', type: 'Taluka', district: 'Shaheed Benazirabad', division: 'Shaheed Benazirabad', lat: 26.1450, lon: 68.0820 },

  // Sanghar
  { id: 'sng-city', name: 'Sanghar City', nameUrdu: 'سانگھڑ', type: 'City', district: 'Sanghar', division: 'Shaheed Benazirabad', lat: 26.0465, lon: 68.9482 },
  { id: 'sng-tando-adam', name: 'Tando Adam', nameUrdu: 'ٹنڈو آدم', type: 'City', district: 'Sanghar', division: 'Shaheed Benazirabad', lat: 25.7682, lon: 68.6620 },
  { id: 'sng-shahdadpur', name: 'Shahdadpur', nameUrdu: 'شہداد پور', type: 'Taluka', district: 'Sanghar', division: 'Shaheed Benazirabad', lat: 25.9250, lon: 68.6210 },
  { id: 'sng-sinjhoro', name: 'Sinjhoro', nameUrdu: 'سنجھورو', type: 'Taluka', district: 'Sanghar', division: 'Shaheed Benazirabad', lat: 26.0310, lon: 68.8050 },
  { id: 'sng-khipro', name: 'Khipro', nameUrdu: 'کھپرو', type: 'Taluka', district: 'Sanghar', division: 'Shaheed Benazirabad', lat: 25.8290, lon: 69.3780 },
  { id: 'sng-jam-nawaz', name: 'Jam Nawaz Ali', nameUrdu: 'جام نواز علی', type: 'Taluka', district: 'Sanghar', division: 'Shaheed Benazirabad', lat: 25.6890, lon: 69.0120 },

  // Naushahro Feroze
  { id: 'nf-city', name: 'Naushahro Feroze', nameUrdu: 'نوشہرو فیروز', type: 'City', district: 'Naushahro Feroze', division: 'Shaheed Benazirabad', lat: 26.8463, lon: 68.1253 },
  { id: 'nf-moro', name: 'Moro', nameUrdu: 'مورو', type: 'Taluka', district: 'Naushahro Feroze', division: 'Shaheed Benazirabad', lat: 26.6620, lon: 68.0010 },
  { id: 'nf-kandiaro', name: 'Kandiaro', nameUrdu: 'کنڈیارو', type: 'Taluka', district: 'Naushahro Feroze', division: 'Shaheed Benazirabad', lat: 26.9150, lon: 68.2120 },
  { id: 'nf-mehrabpur', name: 'Mehrabpur', nameUrdu: 'مہراب پور', type: 'Taluka', district: 'Naushahro Feroze', division: 'Shaheed Benazirabad', lat: 27.1080, lon: 68.4280 },
  { id: 'nf-bhiria', name: 'Bhiria City', nameUrdu: 'بھریا سٹی', type: 'Taluka', district: 'Naushahro Feroze', division: 'Shaheed Benazirabad', lat: 26.9120, lon: 68.1890 },

  // --- MIRPUR KHAS DIVISION ---
  // Mirpur Khas District
  { id: 'mpk-city', name: 'Mirpur Khas City', nameUrdu: 'میرپور خاص', type: 'City', district: 'Mirpur Khas', division: 'Mirpur Khas', lat: 25.5276, lon: 69.0125 },
  { id: 'mpk-digri', name: 'Digri', nameUrdu: 'ڈگری', type: 'Taluka', district: 'Mirpur Khas', division: 'Mirpur Khas', lat: 25.1610, lon: 69.1120 },
  { id: 'mpk-kot-ghulam', name: 'Kot Ghulam Muhammad', nameUrdu: 'کوٹ غلام محمد', type: 'Taluka', district: 'Mirpur Khas', division: 'Mirpur Khas', lat: 25.3120, lon: 69.2450 },
  { id: 'mpk-jhuddo', name: 'Jhuddo', nameUrdu: 'جھڈو', type: 'Taluka', district: 'Mirpur Khas', division: 'Mirpur Khas', lat: 24.9650, lon: 69.3120 },
  { id: 'mpk-sindhri', name: 'Sindhri', nameUrdu: 'سندھڑی', type: 'Taluka', district: 'Mirpur Khas', division: 'Mirpur Khas', lat: 25.6850, lon: 69.1020 },
  { id: 'mpk-shujabad', name: 'Shujabad', nameUrdu: 'شجاع آباد', type: 'Taluka', district: 'Mirpur Khas', division: 'Mirpur Khas', lat: 25.4210, lon: 69.1850 },

  // Umerkot
  { id: 'umk-city', name: 'Umerkot City (Amarkot)', nameUrdu: 'عمرکوٹ', type: 'City', district: 'Umerkot', division: 'Mirpur Khas', lat: 25.3614, lon: 69.7424 },
  { id: 'umk-kunri', name: 'Kunri (Chilli Capital)', nameUrdu: 'کنری', type: 'Taluka', district: 'Umerkot', division: 'Mirpur Khas', lat: 25.1780, lon: 69.5670 },
  { id: 'umk-pithoro', name: 'Pithoro', nameUrdu: 'پتھورو', type: 'Taluka', district: 'Umerkot', division: 'Mirpur Khas', lat: 25.5120, lon: 69.3850 },
  { id: 'umk-samaro', name: 'Samaro', nameUrdu: 'سامارو', type: 'Taluka', district: 'Umerkot', division: 'Mirpur Khas', lat: 25.2890, lon: 69.3980 },

  // Tharparkar
  { id: 'thr-mithi', name: 'Mithi City', nameUrdu: 'مٹھی', type: 'City', district: 'Tharparkar', division: 'Mirpur Khas', lat: 24.7438, lon: 69.7972 },
  { id: 'thr-islamkot', name: 'Islamkot', nameUrdu: 'اسلام کوٹ', type: 'Taluka', district: 'Tharparkar', division: 'Mirpur Khas', lat: 24.7010, lon: 70.1780 },
  { id: 'thr-nagarparkar', name: 'Nagarparkar (Karoonjhar)', nameUrdu: 'نگر پارکر', type: 'Taluka', district: 'Tharparkar', division: 'Mirpur Khas', lat: 24.3580, lon: 70.7550 },
  { id: 'thr-chachro', name: 'Chachro', nameUrdu: 'چھاچھرو', type: 'Taluka', district: 'Tharparkar', division: 'Mirpur Khas', lat: 25.1150, lon: 70.2520 },
  { id: 'thr-diplo', name: 'Diplo', nameUrdu: 'ڈپلو', type: 'Taluka', district: 'Tharparkar', division: 'Mirpur Khas', lat: 24.4680, lon: 69.5850 },
  { id: 'thr-dahli', name: 'Dahli', nameUrdu: 'ڈاہلی', type: 'Taluka', district: 'Tharparkar', division: 'Mirpur Khas', lat: 25.3210, lon: 70.5120 },
  { id: 'thr-kaloi', name: 'Kaloi', nameUrdu: 'کلوئی', type: 'Taluka', district: 'Tharparkar', division: 'Mirpur Khas', lat: 24.6450, lon: 69.3250 },
];
