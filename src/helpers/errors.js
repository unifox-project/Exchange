export default {
    getMessage (response) {
        let errors = null
        if (response.status === 500) {
            errors = {
                system: 'Oops! Something wrong in server!'
            }
        } else {
            errors = response.data
        }

        if (process.env !== 'production') window.console.log('error', errors)

        return errors
    },
    goByStatusCode (status, router) {
        if (status === 401) {
            router.push({
                path: '/#modal-auth'
            })
        } else if (status === 404) {
            router.push({
                name: status
            })
        } else if (status === 500) {
//            this.$notify('text');
//            router.push({
//                name: status
//            })
        }
    }
}
