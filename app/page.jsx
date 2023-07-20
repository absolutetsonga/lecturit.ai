import { Hero } from '@/app/components/Hero';
import { PrimaryFeatures } from '@/app/components/PrimaryFeatures';
import { SecondaryFeatures } from './components/SecondaryFeatures';

export default function Home() {
    return (
        <div>
            <Hero />
            <PrimaryFeatures />
            <SecondaryFeatures />
        </div>
    );
}
