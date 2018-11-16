export default class Student {
    fullName = "";
    email = "";

    constructor(fullName :string, email){
        this.fullName = fullName;
        this.email = email;
    }

    get firstName ()  {
        return this.fullName.substr(0, this.fullName.indexOf(" "))
    }
}