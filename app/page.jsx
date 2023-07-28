import { Hero } from '@/app/components/main/Hero';
import { PrimaryFeatures } from '@/app/components/main/PrimaryFeatures';
import { SecondaryFeatures } from './components/main/SecondaryFeatures';
import { CTA } from './components/main/CTA';

export default function Home() {
    return (
        <div>
            <Hero />
            <PrimaryFeatures />
            {/* <SecondaryFeatures /> */}
            <CTA/>
        </div>
    );
}
