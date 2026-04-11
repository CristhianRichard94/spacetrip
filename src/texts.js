
const today = new Date();
const birthDate = new Date(1994, 10, 12); // Month is 0-indexed, so 10 = November
const age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
document.querySelector("#about-me-section .text").innerHTML = `
        <p>Im ${age} years old.</p>
        <p>Graduated as system engineer from U.T.N.</p>
        <p>
          Building my own business
          <a target="_blank" href="https://automakers.com.au"> Automakers </a>.
        </p>
        <p>Proactive, reliable, team player, problem solver.</p>
`;