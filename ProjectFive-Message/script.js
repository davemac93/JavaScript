const message = document.querySelector('.randomMessage');
const change = document.querySelector('.change');
const generate = document.querySelector('.generate');

const messageArr = ['Enjoy every magical moment.',
    'Smile, it feels great.',
    'Love is stronger than anything.',
    'Thank you for being here.',
    'Listen with an open heart.',
    'Dreams often become realities.',
    'Life is full of wonderful surprises.',
    'Happiness is a journey, not destination.',
    'Sunshine lifts spirits instantly.',
    'Give love to receive love.',
    'Trust your intuition always.',
    'Be grateful for little things.',
    'A smile is the prettiest accessory.',
    'Love wholeheartedly always.',
    'Support others in tough times.',
    'Share your joy without limits.',
    'Forgiveness cleanses the soul completely.',
    'Kindness costs nothing, yet enriches.',
    'Friendship makes life more beautiful.',
    'Laughter heals many wounds.',
    'Hope is a guiding light.',
    'Compassion connects hearts deeply.',
    'Believe in your own strength.',
    'Peace begins with understanding.',
    'Family is a treasure trove.',
    'Every moment is a gift.',
    'Kind words can change lives.',
    'Embrace each day with gratitude.',
    'Joy is found in simple pleasures.',
    'Courage transforms adversity into opportunity.',
    'Patience brings forth great rewards.',
    'A hug can convey a thousand words.',
    'Smiles are contagious, spread generously.',
    'Trust the journey youre on.',
    'Appreciate the beauty around you.',
    'Love fiercely, forgive freely.',
    'Positivity attracts positivity always.',
    'Your presence brings joy.',
    'Believe in the power of love.',
    'Dreams fuel the souls journey.']


const changeMessage = () => {
    const arrLenght = messageArr.length;
    const random = Math.floor(Math.random() * arrLenght);
    console.log(random);
    message.innerHTML = messageArr[random];
}

const changeBackground = () => {

    let randomArr = [];
    for (let i = 0; i<9 ;i++){
        randomArr.push(Math.floor(Math.random() * 256))
    }
    console.log(randomArr);
    document.body.style.background = `rgb(${randomArr[0]},${randomArr[1]},${randomArr[2]})`
    document.body.style.background = `linear-gradient(90deg, rgba(${randomArr[0]},${randomArr[1]},${randomArr[2]},1) 0%, rgba(${randomArr[3]},${randomArr[4]},${randomArr[5]},1) 50%, rgba(${randomArr[6]},${randomArr[7]},${randomArr[8]},1) 100%)`; 
}

change.addEventListener('click', changeMessage);
generate.addEventListener('click', changeBackground);