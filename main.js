const clock = {
    format: 12,
    days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    btnPower: document.querySelector('#btnPower'),
    btnSVG: document.querySelector('.btnSVG'),
    outTime: document.querySelector('#time'),
    outDate: document.querySelector('#date'),
    outToDay: document.querySelector('#today'),
    outFormat: document.querySelector('#format'),
    starting: undefined,
    Format: function (f) {
        this.format = f
    },
    Locale: function (ds) {
        this.days = ds
    },
    OutputDate: function () {
        let dt = new Date()
        let d = dt.getDate()
        let m = dt.getMonth()
        let y = dt.getFullYear()
        let cd = dt.getDay()
        let currentDate

        d = (d < 10) ? '0' + d : d
        m = (m < 10) ? '0' + m : m
        currentDate = d + '.' + m + '.' + y
        this.outDate.innerText = currentDate
        this.outToDay.innerText = this.days[cd]
    },
    OutputTime: function () {
        let dt = new Date()
        let h = dt.getHours()
        let m = dt.getMinutes()
        let s = dt.getSeconds()
        let currentTime
        if (this.format == 12) {
            this.outFormat.classList.remove('powerOff')
            this.outFormat.classList.add('powerOn')
            if (h > 12) {
                this.outFormat.innerText = 'PM'
                h -= 12
            }
            else if (h == 0) {
                this.outFormat.innerText = 'PM'
                h = 12
            }
            else if (h < 12) {
                this.outFormat.innerText = 'AM'

            }
        }

        h = (h < 10) ? '0' + h : h
        m = (m < 10) ? '0' + m : m
        s = (s < 10) ? '0' + s : s
        currentTime = h + ':' + m + ':' + s
        this.outTime.innerText = currentTime
    },
    Start: function () {
        clock.OutputTime()
        clock.OutputDate(
            this.starting = setInterval(function () {
                clock.OutputTime()
                clock.OutputDate()
            }, 1000)
        )
    },
    Stop: function () {
        clearInterval(this.starting)
    }
}

clock.btnPower.addEventListener('click', function () {
    if (this.classList.contains('powerOff')) {
        let ru = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        clock.btnSVG.style.fill = '#0022ff'
        this.classList.remove('powerOff')
        this.classList.add('powerOn')
        clock.outTime.classList.remove('powerOff')
        clock.outTime.classList.add('powerOn')
        clock.outDate.classList.remove('powerOff')
        clock.outDate.classList.add('powerOn')
        clock.outToDay.classList.remove('powerOff')
        clock.outToDay.classList.add('powerOn')
        clock.outFormat.classList.remove('powerOff')
        clock.outFormat.classList.add('powerOn')
        clock.Locale(ru)
        clock.Format(24)
        clock.Start()
    }
    else {
        clock.btnSVG.style.fill = '#555'
        this.classList.remove('powerOn')
        this.classList.add('powerOff')
        clock.outTime.innerText = '88:88:88'
        clock.outTime.classList.remove('powerOn')
        clock.outTime.classList.add('powerOff')
        clock.outDate.classList.remove('powerOn')
        clock.outDate.classList.add('powerOff')
        clock.outToDay.classList.remove('powerOn')
        clock.outToDay.classList.add('powerOff')
        clock.outFormat.classList.remove('powerOn')
        clock.outFormat.classList.add('powerOff')
        clock.Stop()
    }
})

