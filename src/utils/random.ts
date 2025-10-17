function generateRandomId() {
  return Math.floor(Math.random() * 1000000)
}

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomNickname(): { nickname: string; profileCharacter: string } {
  // 형용사 50개
  const adjectives = [
    '행복한',
    '즐거운',
    '신나는',
    '용감한',
    '귀여운',
    '멋진',
    '똑똑한',
    '강한',
    '빠른',
    '느린',
    '조용한',
    '시끄러운',
    '작은',
    '큰',
    '날렵한',
    '포근한',
    '따뜻한',
    '차가운',
    '뜨거운',
    '시원한',
    '배고픈',
    '배부른',
    '졸린',
    '활발한',
    '명랑한',
    '친절한',
    '상냥한',
    '다정한',
    '온화한',
    '차분한',
    '열정적인',
    '적극적인',
    '소극적인',
    '겸손한',
    '당당한',
    '씩씩한',
    '건강한',
    '튼튼한',
    '약한',
    '여린',
    '화난',
    '웃긴',
    '진지한',
    '장난스런',
    '수줍은',
    '대담한',
    '신중한',
    '민첩한',
    '느긋한',
    '부지런한',
  ]

  // 동물 50개 (이름과 이미지 경로)
  const animals = [
    { name: '호랑이', image: 'tiger' },
    { name: '사자', image: 'lion' },
    { name: '곰', image: 'bear' },
    { name: '여우', image: 'fox' },
    { name: '늑대', image: 'wolf' },
    { name: '토끼', image: 'rabbit' },
    { name: '다람쥐', image: 'squirrel' },
    { name: '고양이', image: 'cat' },
    { name: '강아지', image: 'dog' },
    { name: '펭귄', image: 'penguin' },

    { name: '코끼리', image: 'elephant' },
    { name: '기린', image: 'giraffe' },
    { name: '판다', image: 'panda' },
    { name: '코알라', image: 'koala' },
    { name: '캥거루', image: 'kangaroo' },
    { name: '원숭이', image: 'monkey' },
    { name: '얼룩말', image: 'zebra' },
    { name: '하마', image: 'hippo' },
    { name: '코뿔소', image: 'rhino' },
    { name: '뱀', image: 'snake' },

    { name: '독수리', image: 'eagle' },
    { name: '부엉이', image: 'owl' },
    { name: '까마귀', image: 'crow' },
    { name: '앵무새', image: 'parrot' },
    { name: '백조', image: 'swan' },
    { name: '오리', image: 'duck' },
    { name: '닭', image: 'chicken' },
    { name: '병아리', image: 'chick' },
    { name: '돼지', image: 'pig' },
    { name: '소', image: 'cow' },

    { name: '양', image: 'sheep' },
    { name: '염소', image: 'goat' },
    { name: '말', image: 'horse' },
    { name: '당나귀', image: 'donkey' },
    { name: '낙타', image: 'camel' },
    { name: '문어', image: 'octopus' },
    { name: '오징어', image: 'squid' },
    { name: '개구리', image: 'frog' },
    { name: '두더지', image: 'mole' },
    { name: '너구리', image: 'raccoon' },

    { name: '수달', image: 'otter' },
    { name: '비버', image: 'beaver' },
    { name: '햄스터', image: 'hamster' },
    { name: '고슴도치', image: 'hedgehog' },
    { name: '미어캣', image: 'meerkat' },
    { name: '알파카', image: 'alpaca' },
    { name: '사슴', image: 'deer' },
    { name: '치타', image: 'cheetah' },
    { name: '스컹크', image: 'skunk' },
    { name: '물범', image: 'seal' },
  ]

  // 랜덤 선택
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
  const randomNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0')

  return {
    nickname: `${randomAdjective}${randomAnimal.name}${randomNumber}`,
    profileCharacter: randomAnimal.image,
  }
}

export { generateRandomId, generateRandomInt, generateRandomNickname };

