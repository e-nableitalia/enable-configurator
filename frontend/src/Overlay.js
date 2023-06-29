import { Logo } from '@pmndrs/branding'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useRef } from "react";
import { Slider } from "primereact/slider";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillTool, AiOutlineArrowLeft, AiOutlineHighlight } from 'react-icons/ai'
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
								<h2>e-Nable Italia STL Generator</h2>
							</motion.div>
							{/* <div className="support--content" > */}
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
										Create your unique Device with our brand-new 3D customization tool. <strong>Customize</strong> on your needs to fit with recipient characteristics.
									</p>
									<button style={{ background: snap.color }} onClick={() => (state.intro = false)}>
										CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
									</button>
								</motion.div>
							{/* </div> */}
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
	const toast = useRef(null);
	const snap = useSnapshot(state);
	const [device, setDevice] = useState(null);
	const [arm, setArm] = useState(220);
	const [affectedarm, setAffectedArm] = useState(100);
	const [cone, setCone] = useState(100);
	const [coneb, setConeb] = useState(110);
	const [handle, setHandle] = useState(30);
	const [affectedarminner, setAffectedArmInner] = useState(120);
	const deviceItems = [
		{label: 'Bike Adapter', value: 'BikeAdapter'}
	];
	
	const handleClick = async () => {
	
		try {
		  toast.current.show({severity:'info', summary: 'Parameters validated, generating device', detail:'Please wait until complete...', sticky: true});
		  const response = await fetch('http://16.171.7.119:8080/customizer/bikeadapter', {
			method: 'POST',
			body: JSON.stringify({
			   arm: arm,
			   affectedarm: affectedarm,
			   cone: cone,
			   coneb: coneb,
			   handle: handle,
			   affectedarminner: affectedarminner
			}),
			headers: {
			   'Content-type': 'application/json; charset=UTF-8',
			},
		 });
			
	
		  if (!response.ok) {
			toast.current.show({severity:'error', summary: 'Error generating device: ${response.status}', detail:'Error', life: 5000});
			return;
		  }
	
		  toast.current.show({severity:'info', summary: 'Device generation complete', detail:'Starting file download...', life: 3000});
		  
		  const result = await response.blob();
	
		// Create blob link to download
		const url = window.URL.createObjectURL(
			new Blob([result]),
		);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute(
			'download',
			`BikeAdapter.stl`,
		);
	
		// Append to html link element page
		document.body.appendChild(link);
	
		// Start download
		link.click();
	
		// Clean up and remove the link
		link.parentNode.removeChild(link);
		
		console.log('result is: ', JSON.stringify(result, null, 4));
		} catch (err) {
			toast.current.show({severity:'error', summary: 'Error generating device', detail:'Error', life: 5000});
		} finally {

		}
	  };


	return (

		<div className="customizer">
				<Toast ref={toast} />
				<div className="field grid">
					<label for="color" class="col-fixed" style={{ "width": "300px" }}>Device Color</label>
					<div class="col">
						<div id="color" className="color-options">
							{snap.colors.map((color) => (
								<div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
							))}
						</div>
					</div>
				</div>
				<div className="field grid">
					<label for="arm" class="col-fixed" style={{ "width": "300px" }}>A - Arm Length</label>
					<div class="col">
						<InputText value={arm} onChange={(e) => setArm(e.target.value)} className="w-full" tooltip='Enter arm length, allowed range is [170, 240] mm'/>
						<Slider id="arm" disabled="true" value={arm} min="170" max="240" onChange={(e) => setArm(e.value)} className="w-full" />
					</div>
				</div>
				<div className="field grid">
					<label for="affected-arm" class="col-fixed" style={{ "width": "300px" }}>B - Affected Arm Length</label>
					<div class="col">
						<InputText value={affectedarm} onChange={(e) => setAffectedArm(e.target.value)} className="w-full" tooltip='Enter affected arm length, allowed range is [70, A - 35] mm'/>
						<Slider id="affected-arm" disabled='true' value={affectedarm} min="70" max="240" onChange={(e) => setAffectedArm(e.value)} className="w-full" />
					</div>
				</div>

				<div className="field grid">
					<label for="cone" class="col-fixed" style={{ "width": "300px" }}>C - Cone Length Top</label>
					<div class="col">
						<InputText value={cone} onChange={(e) => setCone(e.target.value)} className="w-full" tooltip='Enter  arm circumference (measured on top), allowed range is [100, 150] mm'/>
						<Slider id="cone" value={cone} disabled='true' min="100" max="150" onChange={(e) => setCone(e.value)} className="w-full" />
					</div>
				</div>
				<div className="field grid">
					<label for="coneb" class="col-fixed" style={{ "width": "300px" }}>D - Cone Length Bottom</label>
					<div class="col">
						<InputText value={coneb} onChange={(e) => setConeb(e.target.value)} className="w-full" tooltip='Enter arm circumference (measured at elbow crease), allowed range is [110, 250] mm'/>
						<Slider id="coneb" value={coneb} disabled='true' min="110" max="250" onChange={(e) => setConeb(e.value)} className="w-full" />
					</div>
				</div>
				<div className="field grid">
					<label for="radius" class="col-fixed" style={{ "width": "300px" }}>E - Handle Diameter</label>
					<div class="col">
						<InputText value={handle} onChange={(e) => setHandle(e.target.value)} className="w-full" tooltip='Enter handle diameter, allowed range is [20, 40] mm'/>
						<Slider id="radius" value={handle} disabled='true' min="20" max="40" onChange={(e) => setHandle(e.value)} max="40" min="20" className="w-full" />
					</div>
				</div>
				<div className="field grid">
					<label for="affectedarminner" class="col-fixed" style={{ "width": "300px" }}>F - Affected Arm Inner Length</label>
					<div class="col">
						<InputText value={affectedarminner} onChange={(e) => setAffectedArmInner(e.target.value)} className="w-full" tooltip='Enter affected arm length (measured at elbow crease), allowed range is [100, 200] mm'/>
						<Slider id="affectedarminner" value={affectedarminner} disabled='true' min="100" max="200" onChange={(e) => setAffectedArmInner(e.value)} className="w-full" />
					</div>
				</div>
			

			<Card role="region">
				Change values to generate a custom Device
			</Card>

			<button
				className="share"
				style={{ background: snap.color }}
				onClick={handleClick}>
				GENERATE
				<AiFillTool size="1.3em" />
			</button>
			<button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
				GO BACK
				<AiOutlineArrowLeft size="1.3em" />
			</button>
		</div>
	)
}
