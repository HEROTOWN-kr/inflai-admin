
class NameArray {
  static city() {
    const city = ['시/도 선택', '서울특별시', '인천광역시', '대전광역시', '광주광역시', '대구광역시', '울산광역시', '부산광역시', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도'];
    return city;
  }

  static area() {
    const area = [
      ['구/군 선택'],
      ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
      ['계양구', '남구', '남동구', '동구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
      ['대덕구', '동구', '서구', '유성구', '중구'],
      ['광산구', '남구', '동구', '북구', '서구'],
      ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'],
      ['남구', '동구', '북구', '중구', '울주군'],
      ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'],
      ['고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시', '가평군', '양평군', '여주군', '연천군'],
      ['강릉시', '동해시', '삼척시', '속초시', '원주시', '춘천시', '태백시', '고성군', '양구군', '양양군', '영월군', '인제군', '정선군', '철원군', '평창군', '홍천군', '화천군', '횡성군'],
      ['제천시', '청주시', '충주시', '괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '증평군', '진천군', '청원군'],
      ['계룡시', '공주시', '논산시', '보령시', '서산시', '아산시', '천안시', '금산군', '당진군', '부여군', '서천군', '연기군', '예산군', '청양군', '태안군', '홍성군'],
      ['군산시', '김제시', '남원시', '익산시', '전주시', '정읍시', '고창군', '무주군', '부안군', '순창군', '완주군', '임실군', '장수군', '진안군'],
      ['광양시', '나주시', '목포시', '순천시', '여수시', '강진군', '고흥군', '곡성군', '구례군', '담양군', '무안군', '보성군', '신안군', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'],
      ['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '영천시', '포항시', '고령군', '군위군', '봉화군', '성주군', '영덕군', '영양군', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군'],
      ['거제시', '김해시', '마산시', '밀양시', '사천시', '양산시', '진주시', '진해시', '창원시', '통영시', '거창군', '고성군', '남해군', '산청군', '의령군', '창녕군', '하동군', '함안군', '함양군', '합천군'],
      ['서귀포시', '제주시', '남제주군', '북제주군']
    ];
    return area;
  }

  static blog() {
    const blog = ['유튜브', '인스타', '블로그', '트위치'];
    return blog;
  }

  static aim() {
    const aim = [
      {
        value: '1',
        text: '블로그 체험단'
      },
      {
        value: '2',
        text: '인스타그램 체험단'
      },
      {
        value: '3',
        text: '유튜브 체험단'
      },
      {
        value: '4',
        text: '카페 바이럴'
      },
      {
        value: '5',
        text: '혼합형'
      },
    ];
    return aim;
  }

  static consult() {
    const consult = [
      {
        value: '1',
        text: '제품사진촬영'
      },
      {
        value: '2',
        text: '홍보영상제작'
      },
      {
        value: '3',
        text: '상세페이지제작'
      },
      {
        value: '4',
        text: '메뉴판/배너/포스터'
      },
      {
        value: '5',
        text: '홈페이지제작'
      }
    ];
    return consult;
  }

  static counter() {
    const counter = [
      {
        name: 'nano',
        level: '나노',
        sum: 'nanoSum'
      },
      {
        name: 'micro',
        level: '마이크로',
        sum: 'microSum'
      },
      {
        name: 'macro',
        level: '메크로',
        sum: 'macroSum'
      },
      {
        name: 'mega',
        level: '메가',
        sum: 'megaSum'
      },
      {
        name: 'celebrity',
        level: '셀럽',
        sum: 'celebritySum'
      }
    ];
    return counter;
  }

  static category() {
    const category = [
      {
        name: '뷰티',
        count: '18,710'
      },
      {
        name: '여성패션',
        count: '15,819'
      },
      {
        name: '남성패션',
        count: '5,370'
      },
      {
        name: '육아',
        count: '3,739'
      },
      {
        name: '맛집/요리',
        count: '18,170'
      },
      {
        name: '커피/음료',
        count: '16,650'
      },
      {
        name: '아트/디자인',
        count: '6,431'
      },
      {
        name: 'IT/전자기기',
        count: '6,744'
      },
      {
        name: '게임',
        count: '3,812'
      },
      {
        name: '스포츠',
        count: '4,502'
      },
      {
        name: '여행/레저',
        count: '10,436'
      },
      {
        name: '라이프스타일',
        count: '9,384'
      },
      {
        name: '반려동물',
        count: '5,648'
      },
      {
        name: '쥬얼리',
        count: '10,424'
      },
      {
        name: '자동차',
        count: '1,979'
      }
    ];
    return category;
  }
}

export default NameArray;
