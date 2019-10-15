const SoundConfiguration = {
    sb16: {
        name: 'Sound Blaster 16',
        color: 'success',
        conf: `
        [sblaster]
        sbtype=sb16
        sbbase=220
        irq=7
        dma=1
        hdma=5
        sbmixer=true
        oplmode=auto
        oplemu=default
        oplrate=44100
        `
    },
    gus: {
        name: 'Gravis Ultrasound',
        color: 'danger',
        conf: `
        [gus]
        gus=true
        gusrate=44100
        gusbase=240
        gusirq=5
        gusdma=3
        ultradir=c:\\ultrasnd
        `
    },
    pcs: {
        name: 'PC Speaker',
        color: 'warning',
        conf: `
        `
    },
    cda: {
        name: 'CD Audio',
        color: 'secondary',
        conf: `
        `
    },
    cgb: {
        name: 'Game Blaster',
        color: 'primary',
        conf:`
        [sblaster]
        sbtype=gb
        `
    }
}

export default SoundConfiguration