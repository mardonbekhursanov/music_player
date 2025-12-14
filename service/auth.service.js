const { default: axios } = require("axios")


let otpStore = {}


const sendOtp = async(phone) => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    const expiresAt = Date.now() + 3 * 60 * 1000 // 3 daqiqa
    // const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;


    otpStore[phone] = {otp, expiresAt}

    try {
        await axios.post(
            `${process.env.INFOBIP_BASE_URL}/sms/2/text/advanced`,
            JSON.stringify(
                {
                messages: [{
                    destinations: [{to: "+998500780820"}],
                    from: "ustozdev",
                    text: `Sizning OTP kodingiz: ${otp}`
                }]
            }
            ),
            {
                headers: {
                    'Authorization': `App ${process.env.INFOBIP_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        return true
    } catch (error) {
        console.error(error.response?.data || error.message)
        throw new Error('SMS jo‘natishda xatolik yuz berdi')
    }
}
const checkOtp = (phone, code) => {
    const record = otpStore[phone]
    if(!record) return false
    if(Date.now() > record.expiresAt) {
        delete otpStore[phone]
        return false
    }
    if(record.otp != code) return false

    delete otpStore[phone]
    return true
}

module.exports = {
    sendOtp,
    checkOtp
}