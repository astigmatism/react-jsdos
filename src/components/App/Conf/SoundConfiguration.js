const SoundConfiguration = {
    sb16: {
        name: 'Sound Blaster',
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
        # dosbox continues to use the sb emulation for cd audio so it cannot be disabled
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
        color: 'primary',
        conf: `
        `
    },
    cgb: {
        name: 'Game Blaster',
        color: 'info',
        conf:`
        [sblaster]
        sbtype=gb
        `
    },
    tandy: {
        name: 'Tandy',
        color: 'secondary',
        conf: `
        [dosbox]
        machine=tandy
        [speaker]
        tandy=auto
        tandyrate=44100
        `
    },
    sbp2: {
        name: 'Sound Blaster',
        color: 'success',
        conf: `
        [sblaster]
        sbtype=sbpro2
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
    sc55: {
        name: 'Roland SC-55',
        color: 'info',
        conf:`
        [midi]
        mididevice=fluidsynth
        `
    }
}

export default SoundConfiguration