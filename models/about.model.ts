import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    image: String,
    about_us: String, // về chúng tôi
    mission: String, // Sứ mệnh
    value: String, // Giá trị cố lõi
    why_choose_us: String, // Lý do chọn chúng tôi
    team:{
        imageTeam: String,
        description: String
    }, // Đội ngũ của chúng tôi
    device:{
        imageDevice: String,
        description: String,
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ]
},{
    timestamps: true
});

const About = mongoose.model("About", aboutSchema, "about");
export default About;