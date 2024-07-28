export const handleError = error => {
    if(error?.data){
        let messgae = ''
        if(typeof error.data == "object") {
            if(error.data.errors) {
                let keys = Object.keys(error.data.errors)
                keys.forEach(key => messgae += error.data.errors[key]+ '\n')
                return messgae
            }
        }
    }
    else if (error.response) {
        if(error.response.status === 419)
            return error.response.data.message
        else return error.response.data
    }
    else if (error.request) return error.request
    else return error.message
}