import {
  IconLedger,
  IconShield,
  IconRadar,
  IconGraduation,
  IconClock,
  IconLayers,
  IconChat,
} from './Icons'

// Resuelve la clave 'icon' de los datos a un componente de ícono.
export const ICONS = {
  ledger: IconLedger,
  shield: IconShield,
  radar: IconRadar,
  graduation: IconGraduation,
  clock: IconClock,
  layers: IconLayers,
  chat: IconChat,
}

export function ResolveIcon({ name, ...props }) {
  const Cmp = ICONS[name] || IconRadar
  return <Cmp {...props} />
}
