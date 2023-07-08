import { proxy } from 'valtio'

const state = proxy({
  agreed : false,
  researcher: false,
  maker: false,
  device: null,
  deviceUrl: null,
  name: null,
  email: null,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  color: '#EFBD4E',
  deviceItems : [
		{key: 'BikeAdapter', name: 'Bike Adapter', url: 'https://cad.onshape.com/documents/5b587ad656e9d002f8e6bad6/w/de2c6c2802ab923db649ef32/e/ab629266e0f6758e30a87845'},
    {key: 'BikeAdapterV2', name: 'Bike Adapter V2', url: 'https://cad.onshape.com/documents/5b587ad656e9d002f8e6bad6/w/de2c6c2802ab923db649ef32/e/ab629266e0f6758e30a87845'}
	],
  deviceParameters : [
    {
      key: 'arm',
      value: 220,
      defaultValue: 220,
      min: 170,
      max: 240,
      description: 'A - Arm Length',
      onShapeId: 'A_lng_unaff',
      onShapeParameter: 'lengthValue',
      onShapeUnit: 'mm',
      tooltip: 'Enter arm length, allowed range is [170, 240] mm'
    },
    {
      key: 'affectedArm',
      value: 100,
      defaultValue: 100,
      min: 70,
      max: 240,
      description: 'B - Affected Arm Length',
      onShapeId: 'B_lng_affect',
      onShapeParameter: 'lengthValue',
      onShapeUnit: 'mm',
      tooltip: 'Enter affected arm length, allowed range is [70, A - 35] mm'
    },
    {
      key: 'cone',
      value: 100,
      defaultValue: 100,
      min: 100,
      max: 150,
      description: 'C - Cone Length Top',
      onShapeId: 'C_tip_circ',
      onShapeParameter: 'lengthValue',
      onShapeUnit: 'mm',
      tooltip: 'Enter arm circumference (measured on top), allowed range is [100, 150] mm'
    },
    {
      key: 'coneb',
      value: 110,
      defaultValue: 110,
      min: 110,
      max: 250,
      description: 'D - Cone Length Bottom',
      onShapeId: 'D_root_circ',
      onShapeParameter: 'lengthValue',
      onShapeUnit: 'mm',
      tooltip: 'Enter arm circumference (measured at elbow crease), allowed range is [110, 250] mm'
    },
    {
      key: 'handle',
      value: 30,
      defaultValue: 30,
      min: 20,
      max: 40,
      description: 'E - Handle Diameter',
      onShapeId: 'E_handlebar_dia',
      onShapeParameter: 'lengthValue',
      onShapeUnit: 'mm',
      tooltip: 'Enter handle diameter, allowed range is [20, 40] mm'
    },
    {
      key: 'affectedarminner',
      value: 120,
      defaultValue: 120,
      min: 100,
      max: 200,
      description: 'F - Affected Arm Inner Length',
      onShapeId: 'F_lng_affect_inner_elbow',
      onShapeParameter: 'lengthValue',
      onShapeUnit: 'mm',
      tooltip: 'Enter affected arm length (measured at elbow crease), allowed range is [100, 200] mm'
    }
  ]
})

export { state }
