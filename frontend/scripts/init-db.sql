DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS highlights;

CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  position TEXT NOT NULL,
  uniform_number TEXT NOT NULL,
  tagline TEXT NOT NULL,
  introduction TEXT NOT NULL,
  image_path TEXT NOT NULL
);

CREATE TABLE highlights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL
);

INSERT INTO profile (
  name,
  team,
  position,
  uniform_number,
  tagline,
  introduction,
  image_path
) VALUES (
  '*이서빈*',
  '*부산대학교* 경영학과',
  '*서비스 기획자* / 데이터 분석가',
  '*21학번*',
  '유저 데이터를 기반으로 서비스를 기획하는 *경영학도*입니다. 현재 청년들을 위해 예적금을 추천해주는 서비스 *Y-Fin.*의 출시를 위해 고군분투하고 있는 인재입니다.',
  '안녕하세요, 저는 이서빈입니다. 요즘 서비스 기획을 포함해서 프로젝트를 6개씩 병행하느라 *다크서클 몬스터*가 되어버렸어요. *네카라쿠배당토 취업*을 위해 남은 1년 불태워보겠습니다. 감사합니다!',
  '/images/seobin.jpg'
);

INSERT INTO highlights (label) VALUES
  ('하루커피수혈3잔씩'),
  ('밤샘을밥먹듯하는'),
  ('취업준비하는4학년');
