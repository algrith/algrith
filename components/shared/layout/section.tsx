import { SectionCardWrapper, SectionWrapper } from '@/components/shared/layout/styled';
import ReviewCard from '@/components/home/components/review-card';
import { SectionProps, SectionItemProps, Review } from '@/types';
import { Avatar } from 'antd';

const getTitle = (title: SectionProps['title']) => {
  const data = { text: '', alignment: '' };

  if (typeof title === 'string') data.text = title;
	
	if (title && typeof title === 'object') {
		data.alignment = title.alignment;
		data.text = title.text;
	}

  return data;
};

const SectionItem = ({ subtitle, content, title, icon }: SectionItemProps) => (
	<SectionCardWrapper key={title} data-aos="fade-up">
		<div className="content">
			<div className="top">
				<span>
					{icon}
				</span>

				<h3>{subtitle}</h3>
			</div>

			<h2>{title}</h2>
			{content}
		</div>
	</SectionCardWrapper>
);

const Section = ({ illustration, title, items, id }: SectionProps) => {
	const sectionTitle = getTitle(title);
	const illustrationAttr = {
		className: `illustration ${id}`,
		altText: `${title}_illustration`
	};

	return (
		<SectionWrapper id="outline">
			<div className={illustrationAttr.className}>
				<Avatar src={illustration} alt={illustrationAttr.altText} />
			</div>
			
			<h1 className={sectionTitle.alignment}>
				{sectionTitle.text}
			</h1>

			<div className="items">
				{items.map((item, index) => (
          id == 'reviews' ? (
            <ReviewCard key={index} {...item as Review} />
          ) : (
            <SectionItem key={index} {...item as SectionItemProps} />
          )
				))}
			</div>
		</SectionWrapper>
	);
};

export default Section;