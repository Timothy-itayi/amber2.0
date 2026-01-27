import DeviceMainMenu from '@/components/device-main-menu';

export default function Index() {
  const handleNewGame = () => {
    console.log('Starting new game...');
    // Navigate to game
  };

  const handleSettings = () => {
    console.log('Opening settings...');
    // Navigate to settings
  };

  return (
    <DeviceMainMenu
      title="HEDGEHOG III"
      onNewGame={handleNewGame}
      onSettings={handleSettings}
    />
  );
}