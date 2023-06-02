export default new (class FormSlider {
    constructor () {
        if (FormSlider.instance) return FormSlider.instance;

        this.index = 0;
        this.forms = $('form', $('#slide-parent')[0]);
        this.normalheights = [];

        Array.from(this.forms).forEach((form) => this.normalheights.push(form.offsetHeight))

        FormSlider.instance = this; 
    }
    
    set index (i) {
        localStorage.setItem('index', i)
    }

    get index () {
        return parseInt(localStorage.getItem('index'))
    }

    nextHeightControl = () => {
        console.log(this.index);

        for (let i = 0; i < Array.from(this.forms).length; i++) {
            if (i == this.index) {
                this.forms[i].style.height = 'unset'

                continue;
            }

            this.forms[i].style.height = `${this.normalheights[this.index]}px`;
        }

        this.index++;
    };
})