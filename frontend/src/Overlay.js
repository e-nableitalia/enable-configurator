import { Logo } from '@pmndrs/branding'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState } from "react";
import { Slider } from "primereact/slider";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'

export function Overlay() {
	const snap = useSnapshot(state)
	const transition = { type: 'spring', duration: 0.8 }
	const config = {
		initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
		animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
		exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
	}
	return (
		<div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
				<img src='logo.png' width="80" height="80" alt="logo" />
				<motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
					<Logo width="40" height="40" />
				</motion.div>
			</motion.header>
			<AnimatePresence>
				{snap.intro ? (
					<motion.section key="main" {...config}>
						<div className="section--container" >
							<motion.div
								key="title"
								initial={{ x: 100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
								<h2>e-Nable Italia BIKE ADAPTER.</h2>
							</motion.div>
							<div className="support--content" >
								<motion.div
									key="p"
									initial={{ y: 100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										type: 'spring',
										damping: 7,
										stiffness: 30,
										restDelta: 0.001,
										duration: 0.6,
										delay: 0.2,
										delayChildren: 0.2
									}}>
									<p>
										Create your unique Bike Adapter with our brand-new 3D customization tool. <strong>Customize</strong> on your needs to fit with recipient characteristics.
									</p>
									<button style={{ background: snap.color }} onClick={() => (state.intro = false)}>
										CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
									</button>
								</motion.div>
							</div>
						</div>
					</motion.section>
				) : (
					<motion.section key="custom" {...config}>
						<Customizer />
					</motion.section>
				)}
			</AnimatePresence>
		</div>
	)
}

function Customizer() {
	const snap = useSnapshot(state)
  const [arm, setArm] = useState(50);
  const [affectedarm, setAffectedArm] = useState(50);
	const [cone, setCone] = useState(50);
	const [coneb, setConeb] = useState(50);  
  const [handle, setHandle] = useState(50);
	return (

		<div className="customizer">
        <div className="field grid">
          <label for="color" class="col-fixed" style={{ "width" : "200px" }}>Device Color</label>
          <div class="col">
            <div id="color" className="color-options">
              {snap.colors.map((color) => (
                <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="field grid">
          <label for="arm" class="col-fixed" style={{ "width" : "200px" }}>A - Arm Length</label>
          <div class="col">
              <InputText value={arm} onChange={(e) => setArm(e.target.value)} className="w-full" />
              <Slider id="arm" value={arm} onChange={(e) => setArm(e.value)} className="w-full" />
          </div>
        </div>
        <div className="field grid">
          <label for="affected-arm" class="col-fixed" style={{ "width" : "200px" }}>B - Affected Arm Length</label>
          <div class="col">
              <InputText value={affectedarm} onChange={(e) => setArm(e.target.value)} className="w-full" />
              <Slider id="affected-arm" value={affectedarm} onChange={(e) => setAffectedArm(e.value)} className="w-full" />
          </div>
        </div>

        <div className="field grid">
          <label for="cone" class="col-fixed" style={{ "width" : "200px" }}>C - Cone Length Top</label>
          <div class="col">
              <InputText value={cone} onChange={(e) => setCone(e.target.value)} className="w-full" />
              <Slider id="cone" value={cone} onChange={(e) => setCone(e.value)} className="w-full" />
          </div>
        </div>
        <div className="field grid">
          <label for="coneb" class="col-fixed" style={{ "width" : "200px" }}>D - Cone Length Bottom</label>
          <div class="col">
              <InputText value={coneb} onChange={(e) => setCone(e.target.value)} className="w-full" />
              <Slider id="coneb" value={coneb} onChange={(e) => setConeb(e.value)} className="w-full" />
          </div>
        </div>        
        <div className="field grid">
          <label for="radius" class="col-fixed" style={{ "width" : "200px" }}>E - Handle Radius</label>
          <div class="col">
            <InputText value={handle} onChange={(e) => setHandle(e.target.value)} className="w-full" />
            <Slider id="radius" value={handle} onChange={(e) => setHandle(e.value)} className="w-full" />
          </div>
        </div>

      <Card role="region">
          add space here for properly positioning
      </Card>

			<button
				className="share"
				style={{ background: snap.color }}
				onClick={() => {
					const link = document.createElement('a')
					link.setAttribute('download', 'canvas.png')
					link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
					link.click()
				}}>
				DOWNLOAD
				<AiFillCamera size="1.3em" />
			</button>
			<button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
				GO BACK
				<AiOutlineArrowLeft size="1.3em" />
			</button>
		</div>
	) 
}
