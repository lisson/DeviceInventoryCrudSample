class DbQuery {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    // constructor()
    // {
    //     this.d_ID = 0
    //     this.Name = ""
    //     this.ipAddress = ""
    //     this.ManagementAddress = ""
    //     this.Username = ""
    //     this.Password = ""
    //     this.ManagementPassword = ""
    //     this.CustomFields = {}
    //     this.WaitingUsersCount = {}
    //     this.WaitingUserNames = {}
    // }
}

module.exports = DbQuery