class Validate {
    validatePhone = (inputStr: string) => {
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/im;
        
        if(regex.test(inputStr)) 
            return true;
        else 
            return false;
        
    }

    validateName = (inputStr: string) => {
        const regex: RegExp = /^(\s{0,})([a-zа-яё']{1}[a-zа-яё']{1,})(\s|-{0,1})(([a-zа-яё']{0,})(\s|-{0,1})){0,4}(\s{0,})$/i;
        console.log(regex.test(inputStr))
        if(regex.test(inputStr))
            return true;
        else
            return false;
    }

    validateEmail = (inputStr: string) => {
        const regex = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        
        if (regex.test(inputStr))
            return true;
        else
            return false;
    
    }
}

export default Validate;