function computeInterests(startAmount, monthlyInvest, rate, nbYears) {
    let endAmount = startAmount

    for (let i = 0; i < nbYears; i++) {
        endAmount +=  6 * monthlyInvest
        const yearInterests = rate * endAmount
        endAmount += yearInterests
        endAmount += 6 * monthlyInvest

        console.log(`Solde année ${i + 1} : ${endAmount}€ | Dont intérêts : ${Math.round(yearInterests)}€ `)
    }

    const endRate = endAmount - (startAmount + monthlyInvest * nbYears * 12)
    return { endAmount, endRate }
}

const interests = computeInterests(10000, 1000, 0.1, 10)
console.log(`Solde après la période : ${Math.round(interests.endAmount)}€`)
console.log(`Dont intérêts : ${Math.round(interests.endRate)}€`)